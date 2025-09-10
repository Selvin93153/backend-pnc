import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoEquipoDto } from './create-movimiento-propio.dto';

export class UpdateMovimientoEquipoDto extends PartialType(CreateMovimientoEquipoDto) {}
