import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Control } from './entities/control.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Control, Vehiculo])],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
