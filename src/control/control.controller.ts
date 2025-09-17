import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ControlService } from './control.service';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  create(@Body() dto: CreateControlDto) {
    return this.controlService.create(dto);
  }

    @Get('vehiculo/:idVehiculo')
findByVehiculo(@Param('idVehiculo') idVehiculo: string) {
  return this.controlService.findByVehiculo(+idVehiculo);
}

  @Get()
  findAll() {
    return this.controlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateControlDto) {
    return this.controlService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controlService.remove(+id);
  }


}
