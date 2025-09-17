import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Control } from './entities/control.entity';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { Vehiculo } from '../vehiculos/entities/vehiculos.entity';

@Injectable()
export class ControlService {

  constructor(
    @InjectRepository(Control)
    private controlRepo: Repository<Control>,

    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateControlDto): Promise<Control> {
    const control = this.controlRepo.create({
      km_salida: dto.km_salida,
      km_entrada: dto.km_entrada,
      servicio_km: dto.servicio_km,
    });
  
    if (dto.id_vehiculo) {
      const vehiculo = await this.vehiculoRepo.findOneBy({ id_vehiculo: dto.id_vehiculo });
      if (!vehiculo) throw new NotFoundException('vehiculo no encontrado');
      control.id_vehiculo= vehiculo;
    }
  
    return this.controlRepo.save(control);
  }

  findAll(): Promise<Control[]> {
    return this.controlRepo.find({ relations: ['id_vehiculo'] });
  }

  async findOne(id: number): Promise<Control> {
    const control = await this.controlRepo.findOne({
      where: { id_control: id },
      relations: ['id_vehiculo'],
    });

    if (!control) throw new NotFoundException('Control no encontrado');
    return control;
  }

  async update(id: number, dto: UpdateControlDto): Promise<Control> {
    const control = await this.findOne(id);

    if (dto.id_vehiculo) {
      const vehiculo = await this.vehiculoRepo.findOne({
        where: { id_vehiculo: dto.id_vehiculo },
      });
      if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');
      control.id_vehiculo = vehiculo;
    }

    Object.assign(control, dto);
    return this.controlRepo.save(control);
  }

  async remove(id: number): Promise<void> {
    const control = await this.findOne(id);
    await this.controlRepo.remove(control);
  }

  //filtrado de controles por vehiculos
 async findByVehiculo(idVehiculo: number): Promise<Control[]> {
  const vehiculo = await this.vehiculoRepo.findOneBy({ id_vehiculo: idVehiculo });
  if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');

  return this.controlRepo
    .createQueryBuilder('control')
    .leftJoinAndSelect('control.id_vehiculo', 'vehiculo')
    .where('vehiculo.id_vehiculo = :idVehiculo', { idVehiculo })
    .orderBy('control.fecha_control', 'DESC')
    .getMany();
}

}
