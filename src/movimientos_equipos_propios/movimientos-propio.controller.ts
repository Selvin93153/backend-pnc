import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MovimientosPropiosService } from './movimientos-propio.service';
import { CreateMovimientoEquipoDto } from './dto/create-movimiento-propio.dto';
import { UpdateMovimientoEquipoDto } from './dto/update-movimiento-propio.dto';

@Controller('movimientos-propios')
export class MovimientosPropiosController {
  constructor(private readonly service: MovimientosPropiosService) {}

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
