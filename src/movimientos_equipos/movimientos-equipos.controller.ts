import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { MovimientosEquiposService } from './movimientos-equipos.service';
import { CreateMovimientoEquipoDto } from './dto/create-movimiento-equipo.dto';
import { UpdateMovimientoEquipoDto } from './dto/update-movimiento-equipo.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('movimientos-equipos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('armero')
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
