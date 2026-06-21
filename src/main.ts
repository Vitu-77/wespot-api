import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'src/env';
import { ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';

let app: INestApplication | undefined;

async function bootstrap() {
  app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });

  app.enableShutdownHooks(['SIGINT', 'SIGTERM', 'SIGUSR2']);

  app.setGlobalPrefix('api/v1', {
    exclude: ['docs/*'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(Number(env.PORT), '0.0.0.0');
}

void bootstrap();
