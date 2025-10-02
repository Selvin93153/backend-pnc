import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
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

 @Get('mis-vehiculos')
  async findMyVehiculos(@Req() req) {
    const userId = req.user.userId; // viene del JWT
    return await this.vehiculosService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculosService.findOne(+id);
  }

  @Put(':id')
  @Roles( 'jefe')
  update(@Param('id') id: string, @Body() dto: UpdateVehiculoDto) {
    return this.vehiculosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculosService.remove(+id);
  }
}
