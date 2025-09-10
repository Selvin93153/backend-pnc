// src/movimientos_equipos/entities/movimiento-equipo.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EquipoAsignado } from 'src/equipos_asignados/entities/equipos-asignados.entity';

@Entity('movimientos_propios')
export class MovimientoPropio {
  @PrimaryGeneratedColumn()
  id_movimiento: number;

  @ManyToOne(() => EquipoAsignado, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_asignacion' })
  id_asignacion: EquipoAsignado;

  @ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario_entrega' })
  id_usuario_entrega: Usuario;

  @ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario_recibe' })
  id_usuario_recibe: Usuario;

  @Column({ type: 'date' })
  fecha_entrega: string;

  @Column({ type: 'time' })
  hora_entrega: string;

  @Column({ type: 'date', nullable: true })
  fecha_devolucion?: string;

  @Column({ type: 'time', nullable: true })
  hora_devolucion?: string;

  @Column({ type: 'text', nullable: true })
  comentarios?: string;

  @Column({ default: 'en uso' })
  estado: string;
}
