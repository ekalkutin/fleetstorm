import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api');

  await app.listen(3000);
}

bootstrap()
  .catch(error => {
    console.error(`Error: ${error}`);
  })
  .then(() => {
    console.log(`App started`);
  });
