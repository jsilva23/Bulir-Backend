import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.use(csurf());
}
bootstrap();
