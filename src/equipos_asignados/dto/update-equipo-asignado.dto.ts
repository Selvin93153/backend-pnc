import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoAsignadoDto } from './create-equipo-asignado.dto';

export class UpdateEquipoAsignadoDto extends PartialType(CreateEquipoAsignadoDto) {}
