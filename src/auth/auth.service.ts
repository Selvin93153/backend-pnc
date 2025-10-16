// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(correo: string, contraseña: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { correo },relations: ['rol'] });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const valida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valida) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      sub: usuario.id_usuario,
      correo: usuario.correo,
      rol: usuario.rol?.nombre_rol, // si tienes relación con roles
    };

    const token = await this.jwtService.signAsync(payload);

    const usuarioDto = {
    id_usuario: usuario.id_usuario,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    rol: usuario.rol?.nombre_rol,
  };

    return {
      access_token: token,
      usuario: usuarioDto,
    };
  }


  async changePassword(userId: number, currentPassword: string, newPassword: string) {
  const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: userId } });
  if (!usuario) throw new NotFoundException('Usuario no encontrado');

  const isMatch = await bcrypt.compare(currentPassword, usuario.contraseña);
  if (!isMatch) throw new UnauthorizedException('Contraseña actual incorrecta');

  usuario.contraseña = await bcrypt.hash(newPassword, 10);
  await this.usuarioRepo.save(usuario);

  return { message: 'Contraseña cambiada correctamente' };
}

}


