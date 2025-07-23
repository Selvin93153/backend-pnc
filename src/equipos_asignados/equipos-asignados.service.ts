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

 async create(dto: CreateEquipoAsignadoDto): Promise<EquipoAsignado> {
  const tipo = await this.tipoRepo.findOneBy({ id_tipo: dto.id_tipo });
  const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });

  if (!tipo || !usuario) {
    throw new NotFoundException('Tipo de equipo o usuario no encontrado');
  }

  const equipo = this.equipoRepo.create({
    ...dto,
    id_tipo: tipo,      // aquí se le pasa el objeto completo
    id_usuario: usuario
  });

  return this.equipoRepo.save(equipo);
}


  findAll(): Promise<EquipoAsignado[]> {
    return this.equipoRepo.find({ relations: ['id_tipo', 'id_usuario'] });
  }

  async findOne(id: number): Promise<EquipoAsignado> {
    const equipo = await this.equipoRepo.findOne({
      where: { id_asignacion: id },
      relations: ['id_tipo', 'id_usuario'],
    });
    if (!equipo) throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    return equipo;
  }

  async update(id: number, dto: UpdateEquipoAsignadoDto): Promise<EquipoAsignado> {
    const equipo = await this.findOne(id);

    if (dto.id_tipo) {
      const tipo = await this.tipoRepo.findOneBy({ id_tipo: dto.id_tipo });
      if (!tipo) throw new NotFoundException('Tipo de equipo no encontrado');
  equipo.id_tipo = tipo;
    }
    if (dto.id_usuario) {
      const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });
      if (!usuario) throw new NotFoundException('usuario no encontrado');
  equipo.id_usuario = usuario;
     
    }

    Object.assign(equipo, dto);
    return this.equipoRepo.save(equipo);
  }

  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id);
    await this.equipoRepo.remove(equipo);
  }
}
