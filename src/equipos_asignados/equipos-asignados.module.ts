import { Module } from '@nestjs/common';
import { EquiposAsignadosService } from './equipos-asignados.service';
import { EquiposAsignadosController } from '../equipos_asignados/equipos-asignados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoAsignado } from '../equipos_asignados/entities/equipos-asignados.entity';
import { TipoEquipo } from '../tipos-equipos/entities/tipos-equipos.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoAsignado, TipoEquipo, Usuario])],
  controllers: [EquiposAsignadosController],
  providers: [EquiposAsignadosService],
})
export class EquiposAsignadosModule {}
