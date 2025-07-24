import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Control } from 'src/control/entities/control.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id_vehiculo: number;

  @Column({ length: 50, nullable: true })
  tipo: string;

  @Column({ length: 20, unique: true })
  placa: string;

  @Column({ length: 50, nullable: true })
  marca: string;

  @Column({ length: 50, nullable: true })
  modelo: string;

  @Column({ length: 20, default: 'activo' })
  estado: string;

  @ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: Usuario;

  
  @OneToMany(() => Control, controles => controles.id_vehiculo,)
  controles: Control[];

}
