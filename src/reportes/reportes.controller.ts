import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from '../reportes/dto/create-reporte.dto';
import { UpdateReporteDto } from '../reportes/dto/update-reporte.dto';
import { Reporte } from './entities/reporte.entity';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  create(@Body() createReporteDto: CreateReporteDto): Promise<Reporte> {
    return this.reportesService.create(createReporteDto);
  }
@UseGuards(JwtAuthGuard)
@Get()
findAll(@Req() req): Promise<Reporte[]> {
  const usuario = req.user; // { userId, correo, rol }
  return this.reportesService.findAll(usuario);
}


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Reporte> {
    return this.reportesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReporteDto: UpdateReporteDto): Promise<Reporte> {
    return this.reportesService.update(id, updateReporteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reportesService.remove(id);
  }
}
