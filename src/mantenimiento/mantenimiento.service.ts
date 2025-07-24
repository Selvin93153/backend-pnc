import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from '../mantenimiento/entities/mantenimiento.entity';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { Vehiculo } from '../vehiculos/entities/vehiculos.entity';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private mantenimientoRepo: Repository<Mantenimiento>,
    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateMantenimientoDto): Promise<Mantenimiento> {
    const mantenimiento = this.mantenimientoRepo.create({
      km_actual: dto.km_actual,
      km_servicioproximo: dto.km_servicioproximo,
      tipo_mantenimiento: dto.tipo_mantenimiento,
      descripcion: dto.descripcion,
    });

    const vehiculo = await this.vehiculoRepo.findOneBy({ id_vehiculo: dto.id_vehiculo });
    if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');

    mantenimiento.id_vehiculo = vehiculo;
    return this.mantenimientoRepo.save(mantenimiento);
  }

  findAll(): Promise<Mantenimiento[]> {
    return this.mantenimientoRepo.find({ relations: ['id_vehiculo'] });
  }

  async findOne(id: number): Promise<Mantenimiento> {
    const mantenimiento = await this.mantenimientoRepo.findOne({
      where: { id_mantenimiento: id },
      relations: ['id_vehiculo'],
    });
    if (!mantenimiento) throw new NotFoundException('Mantenimiento no encontrado');
    return mantenimiento;
  }

  async update(id: number, dto: UpdateMantenimientoDto): Promise<Mantenimiento> {
    const mantenimiento = await this.findOne(id);

    if (dto.id_vehiculo) {
      const vehiculo = await this.vehiculoRepo.findOneBy({ id_vehiculo: dto.id_vehiculo });
      if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');
      mantenimiento.id_vehiculo = vehiculo;
    }

    Object.assign(mantenimiento, dto);
    return this.mantenimientoRepo.save(mantenimiento);
  }

  async remove(id: number): Promise<void> {
    const mantenimiento = await this.findOne(id);
    await this.mantenimientoRepo.remove(mantenimiento);
  }
}
