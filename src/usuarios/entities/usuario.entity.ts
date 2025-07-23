import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Reporte } from 'src/reportes/entities/reporte.entity';
import { EquipoAsignado } from 'src/equipos_asignados/entities/equipos-asignados.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

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

  @OneToMany(() => Reporte, reporte => reporte.id_usuario)
reportes: Reporte[];

  @OneToMany(() => EquipoAsignado, equipo => equipo.id_usuario)
  equipos: EquipoAsignado[];
}
