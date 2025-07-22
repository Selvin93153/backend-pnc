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


  async findAll(): Promise<Reporte[]> {
    return this.reportesRepository.find({ relations: ['id_usuario'] });
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
}
