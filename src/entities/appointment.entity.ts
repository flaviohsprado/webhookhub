import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment as IAppointment } from '../types/global';

@Entity('docpulse_appointment')
export class Appointment implements Partial<IAppointment> {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   status: string;

   @Column()
   value: string;

   @Column({
      type: 'enum',
      enum: ['CHECK_UP', 'FOLLOW_UP', 'CONSULTATION', 'PROCEDURE', 'TELEMEDICINE']
   })
   type: "CHECK_UP" | "FOLLOW_UP" | "CONSULTATION" | "PROCEDURE" | "TELEMEDICINE";

   @Column({ name: 'appointment_date', type: 'timestamp with time zone' })
   appointmentDate: Date;

   @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
   updatedAt: Date;

   @Column({ name: 'clinic_id' })
   clinicId: string;

   @Column()
   patientId: string;

   @Column()
   providerId: string;

   @Column({ name: 'google_event_id', nullable: true })
   googleEventId: string | null;
} 