import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisListenerService } from './redis-listener.service';

@Module({
   imports: [
      ConfigModule,
      BullModule.registerQueue({
         name: 'webhook',
      }),
   ],
   providers: [RedisListenerService],
})
export class RedisListenerModule { }