import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateEquipoAsignadoDto {

  @IsNotEmpty()
  @IsString()
  clase: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  calibre?: string;

  @IsNotEmpty()
  @IsString()
  serie: string;

  @IsNotEmpty()
  @IsNumber()
  id_tipo: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}
