import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/orders/webhook', bodyParser.raw({ type: 'application/json' }));

  // Allow requests from Next.js frontend
  app.enableCors({
    origin: `${process.env.FRONTEND_URL}`, // Allow frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
