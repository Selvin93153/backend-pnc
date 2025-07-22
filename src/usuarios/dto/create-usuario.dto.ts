import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(100)
  nombres: string;

  @IsString()
  @MaxLength(100)
  apellidos: string;

  @IsString()
  @MaxLength(20)
  nip: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsNumber()
  id_rol: number;
}
