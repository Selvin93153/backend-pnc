import { IsInt, IsOptional } from 'class-validator';

export class CreateControlDto {
  @IsInt()
  id_vehiculo: number;

  @IsInt()
  km_salida: number;

  @IsOptional()
  @IsInt()
  km_entrada: number;

  @IsInt()
  servicio_km: number;
}
