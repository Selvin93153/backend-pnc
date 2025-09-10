import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosPropiosService } from './movimientos-propio.service';
import { MovimientosPropiosController } from './movimientos-propio.controller';
import { MovimientoPropio } from './entities/movimiento-propio.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EquipoAsignado } from 'src/equipos_asignados/entities/equipos-asignados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoPropio, EquipoAsignado, Usuario])],
  controllers: [MovimientosPropiosController],
  providers: [MovimientosPropiosService],
})
export class MovimientosPropioModule {}
