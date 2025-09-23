import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Role } from '../roles/entities/role.entity';
import { MailModule } from '../mail/mail.module'; // <-- importa el módulo de correo
@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Role]), MailModule], // <-- aquí
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}