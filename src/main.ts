import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  // Validamos que FRONTEND_URL exista
  if (!process.env.FRONTEND_URL) {
    throw new Error('La variable de entorno FRONTEND_URL no está definida');
  }

  // Permitimos múltiples orígenes (producción + desarrollo)
  const allowedOrigins = [
    ...process.env.FRONTEND_URL.split(','),
    ...(process.env.FRONTEND_URL_DEV ? process.env.FRONTEND_URL_DEV.split(',') : []),
  ];

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Permite requests sin origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Bloqueado por CORS: ${origin}`);
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

  // Usa el puerto asignado por Render o 3000 localmente
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(port);

  console.log(` Servidor corriendo en puerto ${port}`);
  console.log(` Orígenes permitidos:`, allowedOrigins);
}
bootstrap();
