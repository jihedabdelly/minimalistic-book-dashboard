import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: "http://localhost:5173", // Allow frontend (needed in production)
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
