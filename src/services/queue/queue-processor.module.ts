import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueProcessorService } from './queue-processor.service';


@Module({
   imports: [
      BullModule.registerQueue({
         name: 'webhook',
      }),
   ],
   providers: [QueueProcessorService],
})
export class QueueProcessorModule { }