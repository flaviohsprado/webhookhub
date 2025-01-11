# WebhookHub

## About

📡 A robust webhook system built with NestJS and TypeScript. Perfect for real-time event processing and data synchronization in healthcare systems. Features include database monitoring, Redis pub/sub, queue management, and reliable webhook delivery. Built as a production-ready system for medical appointment synchronization.

![typescript](https://img.shields.io/badge/-typescript-blue)
![nestjs](https://img.shields.io/badge/-nestjs-red)
![webhooks](https://img.shields.io/badge/-webhooks-green)
![redis](https://img.shields.io/badge/-redis-orange)
![postgres](https://img.shields.io/badge/-postgres-blue)

## Features

- 🔄 Real-time database change monitoring
- 📨 Redis pub/sub event handling
- 📊 Queue-based webhook processing
- 🏥 Healthcare appointment management
- 🔁 Automatic retry mechanism
- 📝 Comprehensive logging
- 🔒 Secure SSL connections

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Redis
- pnpm

## Environment Variables

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
PORT=3000
```

## Installation

```bash
# Install dependencies
pnpm install
```

## Running the app

```bash
# Development
pnpm run start

# Watch mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

## Architecture

The system consists of three main components:

1. **Database Monitor**: Listens to PostgreSQL notifications for data changes
2. **Redis Listener**: Subscribes to Redis channels for event processing
3. **Queue Processor**: Manages webhook delivery with retry capabilities

## API Documentation

Webhook endpoints and payload formats:

```typescript
// Appointment webhook payload
{
  status: string;
  type: "CHECK_UP" | "FOLLOW_UP" | "CONSULTATION" | "PROCEDURE" | "TELEMEDICINE";
  appointmentDate: Date;
  clinic: {
    name: string;
    // ... other clinic details
  };
  patient: {
    name: string;
    // ... other patient details
  };
  provider: {
    name: string;
    // ... other provider details
  };
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is MIT licensed.
