import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { EquiposAsignadosService } from './equipos-asignados.service';
import { CreateEquipoAsignadoDto } from './dto/create-equipo-asignado.dto';
import { UpdateEquipoAsignadoDto } from './dto/update-equipo-asignado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('equipos-asignados')

export class EquiposAsignadosController {
  constructor(private readonly service: EquiposAsignadosService) {}

    @Get('mis-equipos')
  @UseGuards(JwtAuthGuard)
  async findMisEquipos(@Request() req) {
    // si en tu JwtStrategy ya devuelves number:
    const userId: number = req.user.userId; // ← viene del token (payload.sub)
    return this.service.findByUsuario(userId);
  }

   // Ruta para buscar por NIP 
  @Get('por-nip/:nip')
  async findByNip(@Param('nip') nip: string) {
    return this.service.findByNip(nip);
  }

  @Post()
  create(@Body() dto: CreateEquipoAsignadoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('📥 ID recibido en findOne:', id, 'Tipo:', typeof id);
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEquipoAsignadoDto,
  ) {
    console.log('📥 ID recibido en update:', id, 'Tipo:', typeof id);
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log('📥 ID recibido en remove:', id, 'Tipo:', typeof id);
    return this.service.remove(id);
  }

}
