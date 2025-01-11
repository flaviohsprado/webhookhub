import { Processor, WorkerHost } from '@nestjs/bullmq';
import axios from 'axios';
import { Job } from 'bullmq';

@Processor('webhook')
export class QueueProcessorService extends WorkerHost {
   async process(job: Job<any, any, string>): Promise<any> {
      console.log(`Processing job ${job.id} of type: ${job.name}`);
      console.log('Job payload:', job.data);

      switch (job.name) {
         case 'sendWebhook':
            const payload = job.data;
            try {
               console.log('Attempting to send webhook to:', 'http://localhost:3001/example/api/v1');
               const response = await axios.post('http://localhost:3001/example/api/v1', payload);
               console.log('Webhook sent successfully:', response.status);
               return response.data;
            } catch (error) {
               console.error('Failed to send webhook:', {
                  status: error.response?.status,
                  message: error.message,
                  data: error.response?.data
               });
               throw error; // Re-throw to mark job as failed
            }
         default:
            console.warn(`Unknown job type: ${job.name}`);
      }
   }
}