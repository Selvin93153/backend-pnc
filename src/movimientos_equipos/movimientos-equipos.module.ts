import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosEquiposService } from './movimientos-equipos.service';
import { MovimientosEquiposController } from './movimientos-equipos.controller';
import { MovimientoEquipo } from './entities/movimiento-equipo.entity';
import { EquipoPrestamo } from '../equipos_prestamo/entities/equipos-prestamo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoEquipo, EquipoPrestamo, Usuario])],
  controllers: [MovimientosEquiposController],
  providers: [MovimientosEquiposService],
})
export class MovimientosEquiposModule {}
