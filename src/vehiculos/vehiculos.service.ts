import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculos.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

async create(dto: CreateVehiculoDto): Promise<Vehiculo> {
  const vehiculo = this.vehiculoRepo.create({
    tipo: dto.tipo,
    placa: dto.placa,
    marca: dto.marca,
    modelo: dto.modelo,
    estado: dto.estado,
  });

  if (dto.id_usuario) {
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    vehiculo.id_usuario = usuario;
  }

  return this.vehiculoRepo.save(vehiculo);
}


  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepo.find({ relations: ['id_usuario'] });
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepo.findOne({
      where: { id_vehiculo: id },
      relations: ['id_usuario'],
    });
    if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');
    return vehiculo;
  }

  async update(id: number, dto: UpdateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);

    if (dto.id_usuario) {
      const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      vehiculo.id_usuario = usuario;
    }

    Object.assign(vehiculo, dto);
    return this.vehiculoRepo.save(vehiculo);
  }

  async remove(id: number): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepo.remove(vehiculo);
  }
async findByUser(userId: number): Promise<Vehiculo[]> {
    if (!userId) {
      throw new UnauthorizedException('Usuario no identificado');
    }

    // QueryBuilder seguro para relaciones
    const vehiculos = await this.vehiculoRepo
      .createQueryBuilder('vehiculo')
      .leftJoinAndSelect('vehiculo.id_usuario', 'usuario')
      .where('usuario.id_usuario = :id', { id: userId })
      .getMany();

    return vehiculos;
  }
}




