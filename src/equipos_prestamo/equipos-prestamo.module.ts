import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposPrestamoService } from './equipos-prestamo.service';
import { EquiposPrestamoController } from './equipos-prestamo.controller';
import { EquipoPrestamo } from './entities/equipos-prestamo.entity';
import { TipoEquipo } from '../tipos-equipos/entities/tipos-equipos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoPrestamo, TipoEquipo])],
  controllers: [EquiposPrestamoController],
  providers: [EquiposPrestamoService],
})
export class EquiposPrestamoModule {}
