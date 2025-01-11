import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { createClient } from 'redis';

@Injectable()
export class RedisListenerService implements OnModuleDestroy {
   private readonly redisClient;
   private readonly logger = new Logger(RedisListenerService.name);

   constructor(
      @InjectQueue('webhook') private readonly webhookQueue: Queue,
      private configService: ConfigService
   ) {
      const redisConfig = this.configService.get('redis');
      this.redisClient = createClient({
         url: redisConfig.url,
         socket: {
            reconnectStrategy: (retries) => {
               if (retries > 10) {
                  this.logger.error('Max reconnection attempts reached. Stopping reconnection.');
                  return false;
               }
               return Math.min(retries * 50, 2000);
            }
         }
      });

      this.redisClient.on('error', (err) => {
         this.logger.error('Redis Client Error:', err);
      });

      this.redisClient.on('connect', () => {
         this.logger.log('Connected to Redis');
      });

      this.redisClient.on('reconnecting', () => {
         this.logger.log('Reconnecting to Redis...');
      });

      this.initializeRedis().catch(err => {
         this.logger.error('Failed to initialize Redis:', err);
      });
   }

   private async initializeRedis() {
      try {
         await this.redisClient.connect();

         await this.redisClient.subscribe('docpulse_changes', (message) => {
            this.handleMessage(message).catch(err => {
               this.logger.error('Failed to handle message:', err);
            });
         });

         this.logger.log('Successfully initialized Redis subscriber');
      } catch (err) {
         this.logger.error('Failed to connect to Redis:', err);
         throw err;
      }
   }

   async onModuleDestroy() {
      try {
         await this.redisClient.quit();
         this.logger.log('Redis connection closed');
      } catch (err) {
         this.logger.error('Error while closing Redis connection:', err);
      }
   }

   async handleMessage(message: string) {
      try {
         const payload = JSON.parse(message);
         await this.webhookQueue.add('sendWebhook', payload);
      } catch (err) {
         this.logger.error('Error processing message:', err);
         throw err;
      }
   }
}