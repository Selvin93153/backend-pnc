import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';  // Importa ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); 

  // Aquí activas la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si llegan propiedades extras
      transform: true,           // Transforma payloads a instancias de clases DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
