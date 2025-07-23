import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoPrestamo } from './entities/equipos-prestamo.entity';
import { CreateEquiposPrestamoDto } from './dto/create-equipos-prestamo.dto';
import { UpdateEquiposPrestamoDto } from './dto/update-equipos-prestamo.dto';
import { TipoEquipo } from '../tipos-equipos/entities/tipos-equipos.entity';

@Injectable()
export class EquiposPrestamoService {
  constructor(
    @InjectRepository(EquipoPrestamo)
    private prestamoRepo: Repository<EquipoPrestamo>,
    @InjectRepository(TipoEquipo)
    private tipoRepo: Repository<TipoEquipo>,
  ) {}

  async create(dto: CreateEquiposPrestamoDto): Promise<EquipoPrestamo> {
    const tipo = await this.tipoRepo.findOneBy({ id_tipo: dto.id_tipo });
    if (!tipo) throw new NotFoundException('Tipo de equipo no encontrado');

    const prestamo = this.prestamoRepo.create({ ...dto, id_tipo: tipo });
    return this.prestamoRepo.save(prestamo);
  }

  async findAll(): Promise<EquipoPrestamo[]> {
    return this.prestamoRepo.find({ relations: ['id_tipo'] });
  }

  async findOne(id: number): Promise<EquipoPrestamo> {
    const prestamo = await this.prestamoRepo.findOne({ where: { id_prestamo: id }, relations: ['id_tipo'] });
    if (!prestamo) throw new NotFoundException('Equipo en préstamo no encontrado');
    return prestamo;
  }

  async update(id: number, dto: UpdateEquiposPrestamoDto): Promise<EquipoPrestamo> {
    const prestamo = await this.findOne(id);

    if (dto.id_tipo) {
      const tipo = await this.tipoRepo.findOneBy({ id_tipo: dto.id_tipo });
      if (!tipo) throw new NotFoundException('Tipo de equipo no encontrado');
      prestamo.id_tipo = tipo;
    }

    Object.assign(prestamo, dto);
    return this.prestamoRepo.save(prestamo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.prestamoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Equipo en préstamo no encontrado');
  }
}
