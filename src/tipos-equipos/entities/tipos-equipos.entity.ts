import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipos_equipos')
export class TipoEquipo {
  @PrimaryGeneratedColumn()
  id_tipo: number;

  @Column({ length: 50 })
  nombre: string;
}
