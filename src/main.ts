import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      credentials: true,
      origin: ['http://localhost:3000', 'https://admin.iqfoody.com'],
      optionsSuccessStatus: 200
    },
  });
  app.use(compression());
  app.use(cookieParser());
  dotenv.config()
  await app.listen(process.env.PORT);
}
bootstrap();
