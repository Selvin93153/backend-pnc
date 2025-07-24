import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateMantenimientoDto{
@IsInt ()
id_vehiculo: number;

@IsInt ()
km_actual: number;

@IsInt ()
km_servicioproximo: number;

@IsOptional()
@IsString()
tipo_mantenimiento: string;

@IsOptional ()
@IsString()
descripcion: string;

}