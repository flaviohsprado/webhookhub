import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { DatabaseMonitoringService } from './database-monitoring.service';

@Module({
   imports: [
      ConfigModule,
      TypeOrmModule.forFeature([Appointment]),
      BullModule.registerQueue({
         name: 'webhook',
      }),
   ],
   providers: [DatabaseMonitoringService],
   exports: [DatabaseMonitoringService],
})
export class DatabaseMonitoringModule { } 