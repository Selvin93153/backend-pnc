import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EquiposAsignadosService } from './equipos-asignados.service';
import { CreateEquipoAsignadoDto } from './dto/create-equipo-asignado.dto';
import { UpdateEquipoAsignadoDto } from './dto/update-equipo-asignado.dto';

@Controller('equipos-asignados')
export class EquiposAsignadosController {
  constructor(private readonly service: EquiposAsignadosService) {}

  @Post()
  create(@Body() dto: CreateEquipoAsignadoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEquipoAsignadoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
