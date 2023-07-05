import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import graphqlUploadExpress from './Graphql/graphqlUploadExpress';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      credentials: true,
      origin: ['https://admin.iqfoody.com'], //'http://localhost:3000', 
      optionsSuccessStatus: 200
    },
  });
  app.use(compression());
  app.use(cookieParser());
  dotenv.config();
  app.use(graphqlUploadExpress());
  await app.listen(process.env.PORT);
}
bootstrap();
