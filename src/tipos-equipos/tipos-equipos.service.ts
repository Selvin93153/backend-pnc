import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEquipo } from '../tipos-equipos/entities/tipos-equipos.entity';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';

@Injectable()
export class TiposEquiposService {
  constructor(
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,
  ) {}

  async create(dto: CreateTipoEquipoDto): Promise<TipoEquipo> {
    const nuevo = this.tipoEquipoRepository.create(dto);
    return this.tipoEquipoRepository.save(nuevo);
  }

  async findAll(): Promise<TipoEquipo[]> {
    return this.tipoEquipoRepository.find();
  }

  async findOne(id: number): Promise<TipoEquipo> {
    const tipo = await this.tipoEquipoRepository.findOneBy({ id_tipo: id });
    if (!tipo) throw new NotFoundException(`Tipo de equipo con ID ${id} no encontrado`);
    return tipo;
  }

  async update(id: number, dto: UpdateTipoEquipoDto): Promise<TipoEquipo> {
    const tipo = await this.findOne(id);
    Object.assign(tipo, dto);
    return this.tipoEquipoRepository.save(tipo);
  }

  async remove(id: number): Promise<void> {
    const tipo = await this.findOne(id);
    await this.tipoEquipoRepository.remove(tipo);
  }
}
