import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  id_tipo: number;

  @IsNotEmpty()
  id_usuario: number;
}
