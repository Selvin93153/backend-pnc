import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TiposEquiposService } from './tipos-equipos.service';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('tipos-equipos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiposEquiposController {
  constructor(private readonly tiposEquiposService: TiposEquiposService) {}

  @Post()
  create(@Body() dto: CreateTipoEquipoDto) {
    return this.tiposEquiposService.create(dto);
  }

  @Get()
  @Roles('armero', 'jefe')
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
