import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from './entities/reporte.entity';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte, Usuario])],
  providers: [ReportesService],
  controllers: [ReportesController],
})
export class ReportesModule {}
