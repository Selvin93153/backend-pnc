import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MovimientosEquiposService } from './movimientos-equipos.service';
import { CreateMovimientoEquipoDto } from './dto/create-movimiento-equipo.dto';
import { UpdateMovimientoEquipoDto } from './dto/update-movimiento-equipo.dto';

@Controller('movimientos-equipos')
export class MovimientosEquiposController {
  constructor(private readonly service: MovimientosEquiposService) {}

  @Post()
  create(@Body() dto: CreateMovimientoEquipoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMovimientoEquipoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
