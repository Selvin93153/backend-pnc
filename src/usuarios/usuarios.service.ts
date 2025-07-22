import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

async create(dto: CreateUsuarioDto): Promise<Usuario> {
  const rol = await this.roleRepository.findOneBy({ id_rol: dto.id_rol });
  if (!rol) {
    throw new NotFoundException('Rol no encontrado');
  }

  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(dto.contraseña, saltOrRounds);

  const usuario = this.usuarioRepository.create({
    ...dto,
    contraseña: hashedPassword,
    rol,
  });

  return this.usuarioRepository.save(usuario);
}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['rol'] });
  }

  async findOne(id_usuario: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario }, relations: ['rol'] });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

async update(id_usuario: number, dto: UpdateUsuarioDto): Promise<Usuario> {
  const usuario = await this.findOne(id_usuario);

  if (dto.id_rol) {
    const rol = await this.roleRepository.findOneBy({ id_rol: dto.id_rol });
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }
    usuario.rol = rol;
  }

  if (dto.contraseña) {
    const saltOrRounds = 10;
    dto.contraseña = await bcrypt.hash(dto.contraseña, saltOrRounds);
  }

  Object.assign(usuario, dto);
  return this.usuarioRepository.save(usuario);
}

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}
