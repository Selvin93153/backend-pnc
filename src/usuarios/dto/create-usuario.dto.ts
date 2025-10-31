import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  MaxLength, 
  IsNumber, 
  Matches 
} from 'class-validator';

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

  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  @MaxLength(255, { message: 'El correo es demasiado largo' })
  correo: string;

  @IsString({ message: 'La contraseña debe ser un texto válido' })
  @MinLength(7, { message: 'La contraseña debe tener al menos 7 caracteres' })
  @MaxLength(25, { message: 'La contraseña es demasiado larga' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!&*]).*$/, {
    message:
      'La contraseña debe incluir mayúsculas, minúsculas, números y al menos un símbolo permitido (@, #, $, %, !, &, *)',
  })
  @Matches(/^\S*$/, { message: 'La contraseña no puede contener espacios al inicio, intermedios o finales' })
  @Matches(/^[A-Za-z\d@#$%!&*]+$/, {
    message:
      'Se ingresó un símbolo no permitido. Solo se permiten letras, números y los símbolos: @, #, $, %, !, &, *',
  })
  contraseña: string;

  @IsNumber()
  id_rol: number;
}
