// src/auth/dto/forgot-password.dto.ts
import { IsEmail, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  @MaxLength(80, { message: 'El correo es demasiado largo' })
  correo: string;
}
