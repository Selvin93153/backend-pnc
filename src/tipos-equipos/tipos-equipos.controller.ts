import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TiposEquiposService } from './tipos-equipos.service';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';

@Controller('tipos-equipos')
export class TiposEquiposController {
  constructor(private readonly tiposEquiposService: TiposEquiposService) {}

  @Post()
  create(@Body() dto: CreateTipoEquipoDto) {
    return this.tiposEquiposService.create(dto);
  }

  @Get()
  findAll() {
    return this.tiposEquiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposEquiposService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTipoEquipoDto) {
    return this.tiposEquiposService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposEquiposService.remove(+id);
  }
}
