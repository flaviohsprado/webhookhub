import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from './config/redis.config';
import { DatabaseMonitoringModule } from './database/database-monitoring.module';
import { QueueProcessorModule } from './services/queue/queue-processor.module';
import { RedisListenerModule } from './services/redis/redis-listener.module';
import { TypeormModuleConfig } from './services/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: configService.get('redis'),
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
      inject: [ConfigService],
    }),
    TypeormModuleConfig,
    DatabaseMonitoringModule,
    QueueProcessorModule,
    RedisListenerModule,
  ],
})
export class AppModule { }
