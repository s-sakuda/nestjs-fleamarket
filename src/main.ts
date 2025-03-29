import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // アプリケーション全体でバリデーションが有効になる
  app.enableCors({
    origin: 'http://example.com',
    methods: ['GET', 'POST'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
