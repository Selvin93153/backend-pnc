import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'La contraseña actual debe ser un texto válido' })
  @MinLength(7, { message: 'La contraseña actual debe tener al menos 7 caracteres' })
  @MaxLength(25, { message: 'La contraseña actual es demasiado larga' })
  @Matches(/^\S*$/, { message: 'La contraseña actual no puede contener espacios' })
  currentPassword: string;

  @IsString({ message: 'La nueva contraseña debe ser un texto válido' })
  @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
  @MaxLength(128, { message: 'La nueva contraseña es demasiado larga' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!&*]).*$/, {
    message: 'La nueva contraseña debe incluir mayúsculas, minúsculas, números y al menos un símbolo permitido (@, #, $, %, !, &, *)',
  })
  @Matches(/^\S*$/, { message: 'La nueva contraseña no puede contener espacios' })
  @Matches(/^[A-Za-z\d@#$%!&*]+$/, {
    message:
      'Se ingresó un símbolo no permitido. Solo se permiten letras, números y los símbolos: @, #, $, %, !, &, *',
  })
  newPassword: string;
}
