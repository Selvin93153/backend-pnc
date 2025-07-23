import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoEquipoDto } from './create-movimiento-equipo.dto';

export class UpdateMovimientoEquipoDto extends PartialType(CreateMovimientoEquipoDto) {}
