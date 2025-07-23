// src/movimientos_equipos/entities/movimiento-equipo.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EquipoPrestamo } from '../../equipos_prestamo/entities/equipos-prestamo.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('movimientos_equipos')
export class MovimientoEquipo {
  @PrimaryGeneratedColumn()
  id_movimiento: number;

  @ManyToOne(() => EquipoPrestamo, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_prestamo' })
  id_prestamo: EquipoPrestamo;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario_entrega' })
  id_usuario_entrega: Usuario;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'SET NULL' })
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
