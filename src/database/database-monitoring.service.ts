import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { Client } from 'pg';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseMonitoringService implements OnModuleInit, OnModuleDestroy {
   private readonly logger = new Logger(DatabaseMonitoringService.name);
   private client: Client;

   constructor(
      @InjectQueue('webhook') private readonly webhookQueue: Queue,
      private dataSource: DataSource,
      private configService: ConfigService,
   ) { }

   async onModuleInit() {
      try {
         const databaseUrl = this.configService.get<string>('DATABASE_URL');

         this.client = new Client({
            connectionString: databaseUrl,
            ssl: {
               rejectUnauthorized: false
            }
         });

         await this.client.connect();

         // Listen for notifications on the docpulse_changes channel
         await this.client.query('LISTEN docpulse_changes');

         this.client.on('notification', async (notification) => {
            try {
               const payload = JSON.parse(notification.payload);
               this.logger.log(`Received database notification: ${JSON.stringify(payload)}`);

               // Add the notification to the webhook queue
               await this.webhookQueue.add('sendWebhook', payload);
            } catch (error) {
               this.logger.error('Error processing notification:', error);
            }
         });

         this.logger.log('Successfully initialized PostgreSQL notification listener');
      } catch (error) {
         this.logger.error('Failed to initialize PostgreSQL notification listener:', error);
         throw error;
      }
   }

   async onModuleDestroy() {
      try {
         if (this.client) {
            await this.client.query('UNLISTEN docpulse_changes');
            await this.client.end();
         }
      } catch (error) {
         this.logger.error('Error while cleaning up PostgreSQL listener:', error);
      }
   }
}
