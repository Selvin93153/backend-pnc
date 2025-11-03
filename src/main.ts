import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  // Aseguramos que la variable de entorno exista
  if (!process.env.FRONTEND_URL) {
    throw new Error('La variable de entorno FRONTEND_URL no está definida');
  }

  const allowedOrigins = process.env.FRONTEND_URL.split(',');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Permite requests sin origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Usamos el puerto que Render asigne o 3000 por defecto para local
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(port);

  console.log(`Servidor corriendo en puerto ${port}`);
}
bootstrap();
