import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
   url: process.env.REDIS_URL,
   maxRetriesPerRequest: null,
   enableReadyCheck: false,
   commandTimeout: 60000,
   retryStrategy: (times: number) => Math.min(times * 50, 2000),
   reconnectOnError: (err: Error) => err.message.includes('READONLY')
})); 