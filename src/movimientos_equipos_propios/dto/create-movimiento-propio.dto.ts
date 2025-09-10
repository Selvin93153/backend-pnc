import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMovimientoEquipoDto {
  @IsInt()
  id_asignacion: number;

  @IsInt()
  id_usuario_entrega: number;

  @IsInt()
  id_usuario_recibe: number;

  @IsOptional()
   @IsString()
  fecha_devolucion?: string;

  @IsOptional()
  @IsString()
  hora_devolucion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comentarios?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  estado?: string;
}
