import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoAsignado } from './entities/equipos-asignados.entity';
import { CreateEquipoAsignadoDto } from './dto/create-equipo-asignado.dto';
import { UpdateEquipoAsignadoDto } from './dto/update-equipo-asignado.dto';
import { TipoEquipo } from '../tipos-equipos/entities/tipos-equipos.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EquiposAsignadosService {
  constructor(
    @InjectRepository(EquipoAsignado)
    private readonly equipoRepo: Repository<EquipoAsignado>,

    @InjectRepository(TipoEquipo)
    private readonly tipoRepo: Repository<TipoEquipo>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // Crear un equipo asignado
  async create(dto: CreateEquipoAsignadoDto): Promise<EquipoAsignado> {
    // Validar que existan las relaciones
    const tipo = await this.tipoRepo.findOneBy({ id_tipo: dto.id_tipo });
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });

    if (!tipo || !usuario) throw new NotFoundException('Tipo o usuario no encontrado');

    // Crear el registro usando los IDs directamente
    const equipo = this.equipoRepo.create({
      ...dto,
      id_tipo: dto.id_tipo,
      id_usuario: dto.id_usuario,
    });

    return this.equipoRepo.save(equipo);
  }

  // Listar todos los equipos asignados
  findAll(): Promise<EquipoAsignado[]> {
    return this.equipoRepo.find({ relations: ['tipo', 'usuario'] });
  }

  // Buscar un equipo por ID
  async findOne(id: number): Promise<EquipoAsignado> {
    const equipo = await this.equipoRepo.findOne({
      where: { id_asignacion: id },
      relations: ['tipo', 'usuario'],
    });
    if (!equipo) throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    return equipo;
  }

  // Actualizar un equipo asignado
  async update(id: number, dto: UpdateEquipoAsignadoDto): Promise<EquipoAsignado> {
    const equipo = await this.findOne(id);

    if (dto.id_tipo) {
      const tipo = await this.tipoRepo.findOneBy({ id_tipo: dto.id_tipo });
      if (!tipo) throw new NotFoundException('Tipo de equipo no encontrado');
      equipo.id_tipo = dto.id_tipo; // Pasamos el número
    }

    if (dto.id_usuario) {
      const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      equipo.id_usuario = dto.id_usuario; // Pasamos el número
    }

    Object.assign(equipo, dto);
    return this.equipoRepo.save(equipo);
  }

  // Eliminar un equipo asignado
  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id);
    await this.equipoRepo.remove(equipo);
  }

  // Buscar equipos por usuario
  async findByUsuario(userId: number): Promise<EquipoAsignado[]> {
    return this.equipoRepo.find({
      where: { id_usuario: userId },
      relations: ['tipo', 'usuario'],
    });
  }
}


