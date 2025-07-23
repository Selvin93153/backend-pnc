import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';

export class CreateVehiculoDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipo?: string;

  @IsString()
  @MaxLength(20)
  placa: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  marca?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  modelo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  estado?: string;

  @IsOptional()
  @IsInt()
  id_usuario?: number;
}
