import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'src/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });

  app.enableShutdownHooks();

  await app.listen(env.PORT);
}

bootstrap();
