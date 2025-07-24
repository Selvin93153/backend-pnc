import { Vehiculo } from "src/vehiculos/entities/vehiculos.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity ('Mantenimiento')
export class Mantenimiento{

@PrimaryGeneratedColumn()
id_mantenimiento: number;

@CreateDateColumn({type:'timestamp'})
fecha_servicio: Date;

@Column({ type: 'int', nullable: false })
  km_actual: number;

  @Column({ type: 'int', nullable: false })
  km_servicioproximo: number;

  @Column({ length: 50, nullable: false })
  tipo_mantenimiento: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToMany (() => Vehiculo , {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn ({name: 'id_vehiculo'})
  id_vehiculo: Vehiculo;

}