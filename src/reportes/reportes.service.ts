import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteDto } from '../reportes/dto/create-reporte.dto';
import {  UpdateReporteDto } from '../reportes/dto/update-reporte.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reportesRepository: Repository<Reporte>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

 async create(createReporteDto: CreateReporteDto): Promise<Reporte> {
  const usuario = await this.usuariosRepository.findOne({
    where: { id_usuario: createReporteDto.id_usuario },
  });

  if (!usuario) throw new NotFoundException('Usuario no encontrado');

  const reporte = this.reportesRepository.create({
    titulo: createReporteDto.titulo,
    descripcion: createReporteDto.descripcion,
    id_usuario: usuario,
  });

  return this.reportesRepository.save(reporte);
}


async findAll(usuarioSolicitante: any): Promise<Reporte[]> {
  const rolesConAccesoTotal = ['armero', 'jefe'];

  if (rolesConAccesoTotal.includes(usuarioSolicitante.rol)) {
    // armero y jefe ven todos los reportes
    return this.reportesRepository.find({ relations: ['id_usuario'] });
  } else {
    // usuarios normales solo ven sus propios reportes
    return this.reportesRepository.find({
      where: { id_usuario: usuarioSolicitante.userId },
      relations: ['id_usuario'],
    });
  }
}


async findOne(id: number): Promise<Reporte> {
  const reporte = await this.reportesRepository.findOne({
    where: { id_reporte: id },  // 👈 usa el nombre del campo correcto en tu entidad
    relations: ['id_usuario'],
  });

  if (!reporte) throw new NotFoundException(`Reporte con id ${id} no encontrado`);
  return reporte;
}

  async update(id: number, updateReporteDto: UpdateReporteDto): Promise<Reporte> {
    const reporte = await this.findOne(id);
    if (updateReporteDto.titulo !== undefined) reporte.titulo = updateReporteDto.titulo;
    if (updateReporteDto.descripcion !== undefined) reporte.descripcion = updateReporteDto.descripcion;
    return this.reportesRepository.save(reporte);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reportesRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Reporte con id ${id} no encontrado`);
  }

  async marcarVisto(id: number): Promise<Reporte> {
  const reporte = await this.findOne(id);
  if (!reporte.visto) {
    reporte.visto = true;
    return this.reportesRepository.save(reporte);
  }
  return reporte; // si ya estaba visto, devuelve igual
}

// Todos los reportes NO vistos
async findAllNoVistos(): Promise<Reporte[]> {
  return this.reportesRepository.find({
    where: { visto: false },
    order: { fecha_creacion: 'DESC' },
    relations: ['id_usuario'],
  });
}

// Todos los reportes VISTOS
async findAllVistos(): Promise<Reporte[]> {
  return this.reportesRepository.find({
    where: { visto: true },
    order: { fecha_creacion: 'DESC' },
    relations: ['id_usuario'],
  });
}
}
