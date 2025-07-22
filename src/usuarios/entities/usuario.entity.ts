import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ length: 20, unique: true })
  nip: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column('text')
  contraseña: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'id_rol' })
  rol: Role;
}
