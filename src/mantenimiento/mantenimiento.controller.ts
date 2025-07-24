import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';

@Controller('mantenimiento')
export class MantenimientoController {
  constructor(private readonly mantenimientoService: MantenimientoService) {}

  @Post()
  create(@Body() dto: CreateMantenimientoDto) {
    return this.mantenimientoService.create(dto);
  }

  @Get()
  findAll() {
    return this.mantenimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mantenimientoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMantenimientoDto) {
    return this.mantenimientoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mantenimientoService.remove(+id);
  }
}
