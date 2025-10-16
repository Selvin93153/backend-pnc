import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { MovimientosEquiposService } from './movimientos-equipos.service';
import { CreateMovimientoEquipoDto } from './dto/create-movimiento-equipo.dto';
import { UpdateMovimientoEquipoDto } from './dto/update-movimiento-equipo.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('movimientos-equipos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MovimientosEquiposController {
  constructor(private readonly service: MovimientosEquiposService) {}

  @Post()
  @Roles('armero')
  create(@Body() dto: CreateMovimientoEquipoDto) {
    return this.service.create(dto);
  }

  @Get()
   @Roles('armero')
  findAll() {
    return this.service.findAll();
  }

  // Filtrar datos po nip
@Get('por-nip/:nip')
 @Roles('armero')
async findByNip(@Param('nip') nip: string) {
  return this.service.findByNipRecibe(nip);
}

@Get('prestamos-en-uso/:id_usuario')
 @Roles('armero', 'jefe', 'agente operativo')
async getPrestamosEnUso(@Param('id_usuario') id_usuario: number) {
  return this.service.findPrestamosEnUsoPorUsuario(+id_usuario);
}


  @Get(':id')
    @Public()
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
   @Roles('armero')
  update(@Param('id') id: number, @Body() dto: UpdateMovimientoEquipoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
   @Roles('armero')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
