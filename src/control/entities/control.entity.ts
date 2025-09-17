import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Vehiculo } from '../../vehiculos/entities/vehiculos.entity';

@Entity('control')
export class Control {
  @PrimaryGeneratedColumn()
  id_control: number;

  @ManyToOne(() => Vehiculo, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_vehiculo' })
  id_vehiculo: Vehiculo;

  @Column()
  km_salida: number;

  @Column({ nullable: true })
km_entrada: number;


  @Column()
  servicio_km: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_control: Date;
}
