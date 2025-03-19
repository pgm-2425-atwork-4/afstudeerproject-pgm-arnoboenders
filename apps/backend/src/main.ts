import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Express } from 'express';
import * as express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance() as Express;

  // 🚀 Fix: Use `express.raw()` to prevent JSON parsing on webhooks
  expressApp.use('/orders/webhook', express.raw({ type: 'application/json' }));

  // Allow Next.js frontend to make API calls
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
