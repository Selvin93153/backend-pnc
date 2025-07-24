import { Module } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';
import { MantenimientoController } from './mantenimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mantenimiento, Vehiculo])],
  controllers: [MantenimientoController],
  providers: [MantenimientoService],
})
export class MantenimientoModule {}
