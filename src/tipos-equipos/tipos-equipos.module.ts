import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposEquiposController } from './tipos-equipos.controller';
import { TiposEquiposService } from './tipos-equipos.service';
import { TipoEquipo } from '../tipos-equipos/entities/tipos-equipos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEquipo])],
  controllers: [TiposEquiposController],
  providers: [TiposEquiposService],
})
export class TiposEquiposModule {}
