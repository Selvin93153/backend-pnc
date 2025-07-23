import { PartialType } from '@nestjs/mapped-types';
import { CreateEquiposPrestamoDto } from './create-equipos-prestamo.dto';

export class UpdateEquiposPrestamoDto extends PartialType(CreateEquiposPrestamoDto) {}
