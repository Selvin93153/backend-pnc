import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTipoEquipoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;
}
