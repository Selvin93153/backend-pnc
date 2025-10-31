import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.service'; // importa tu servicio de correo


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private readonly mailService: MailService, 
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
 try {
  return await this.usuarioRepository.save(usuario);
} catch (error: any) {
  if (error.code === '23505') {
    if (error.detail.includes('correo'))
      throw new ConflictException('El correo ya existe, no puedes usarlo');
    if (error.detail.includes('nip'))
      throw new ConflictException('El NIP ya existe, no puedes usarlo');
  }
  throw error;
}}
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



async forgotPassword(correo: string): Promise<{ message: string }> {
  const usuario = await this.usuarioRepository.findOne({ where: { correo } });
  if (!usuario) throw new NotFoundException('Usuario no encontrado');

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  usuario.reset_token = token;
  usuario.reset_expires = expires;

  await this.usuarioRepository.save(usuario);

  // Construir el link de recuperación
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

 // reemplaza con tu URL real

  // Enviar correo con el token
  await this.mailService.sendMail(
  correo,
  'Recuperación de contraseña',
  `
    <p>Hola ${usuario.nombres},</p>
    <p>Se ha solicitado restablecer tu contraseña.</p>
    <p>Haz clic en el siguiente enlace para cambiar tu contraseña (válido 15 minutos):</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>Si no solicitaste este cambio, ignora este correo.</p>
  `
);


  return { message: 'Se ha enviado un correo con instrucciones para recuperar la contraseña' };
}


  // === Resetear contraseña usando token ===
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const usuario = await this.usuarioRepository.findOne({ where: { reset_token: token } });

    if (!usuario) throw new NotFoundException('Token inválido');
    if (!usuario.reset_expires || usuario.reset_expires < new Date()) throw new NotFoundException('Token expirado');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    usuario.contraseña = hashedPassword;

    usuario.reset_token = null;
    usuario.reset_expires = null;

    await this.usuarioRepository.save(usuario);

    return { message: 'Contraseña cambiada correctamente' };
  }


//registrar un usuario del login publicamente
async createPublic(dto: CreateUsuarioDto): Promise<Usuario> {
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
 try {
  return await this.usuarioRepository.save(usuario);
} catch (error: any) {
  if (error.code === '23505') {
    if (error.detail.includes('correo'))
      throw new ConflictException('El correo ya existe, no puedes usarlo');
    if (error.detail.includes('nip'))
      throw new ConflictException('El NIP ya existe, no puedes usarlo');
  }
  throw error;
}}

}


