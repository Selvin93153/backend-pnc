import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from '../reportes/dto/create-reporte.dto';
import { UpdateReporteDto } from '../reportes/dto/update-reporte.dto';
import { Reporte } from './entities/reporte.entity';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@Controller('reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  create(@Body() createReporteDto: CreateReporteDto): Promise<Reporte> {
    return this.reportesService.create(createReporteDto);
  }

@Get()
findAll(@Req() req): Promise<Reporte[]> {
  const usuario = req.user; // { userId, correo, rol }
  return this.reportesService.findAll(usuario);
}

 @Get('nuevos')
  @Roles('armero', 'jefe')
async findAllNoVistos(): Promise<Reporte[]> {
  return this.reportesService.findAllNoVistos();
}

// Obtener todos los reportes VISTOS
@Get('vistos')
 @Roles('armero', 'jefe')
async findAllVistos(): Promise<Reporte[]> {
  return this.reportesService.findAllVistos();
}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Reporte> {
    return this.reportesService.findOne(id);
  }

 

  @Patch(':id/visto')
   @Roles('armero')
async marcarVisto(@Param('id', ParseIntPipe) id: number): Promise<Reporte> {
  return this.reportesService.marcarVisto(id);
}

  @Put(':id')
   @Roles('agente operativo')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReporteDto: UpdateReporteDto): Promise<Reporte> {
    return this.reportesService.update(id, updateReporteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reportesService.remove(id);
  }
}
