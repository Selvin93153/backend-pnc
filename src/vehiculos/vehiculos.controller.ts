import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('vehiculos')
@UseGuards(JwtAuthGuard, RolesGuard)

export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
   @Roles( 'jefe')
  create(@Body() dto: CreateVehiculoDto) {
    return this.vehiculosService.create(dto);
  }

  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVehiculoDto) {
    return this.vehiculosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculosService.remove(+id);
  }
}
