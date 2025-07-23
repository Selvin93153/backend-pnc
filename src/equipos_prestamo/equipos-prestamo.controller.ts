import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EquiposPrestamoService } from './equipos-prestamo.service';
import { CreateEquiposPrestamoDto } from './dto/create-equipos-prestamo.dto';
import { UpdateEquiposPrestamoDto } from './dto/update-equipos-prestamo.dto';

@Controller('equipos-prestamo')
export class EquiposPrestamoController {
  constructor(private readonly service: EquiposPrestamoService) {}

  @Post()
  create(@Body() dto: CreateEquiposPrestamoDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateEquiposPrestamoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
