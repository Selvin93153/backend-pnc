import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { TipoEquipo } from '../../tipos-equipos/entities/tipos-equipos.entity';
import { MovimientoEquipo } from 'src/movimientos_equipos/entities/movimiento-equipo.entity';

@Entity('equipos_prestamo')
export class EquipoPrestamo {
  @PrimaryGeneratedColumn()
  id_prestamo: number;

   @Column({ length: 50, nullable: true })
  clase: string;

  @Column({ length: 50, nullable: true })
  marca: string;

  @Column({ length: 20, nullable: true })
  calibre: string;

  @Column({ length: 50, unique: true })
  serie: string;

  @ManyToOne(() => TipoEquipo, tipo => tipo.equiposPrestamo, { onDelete: 'SET NULL' })
   @JoinColumn({ name: 'id_tipo' })
  id_tipo: TipoEquipo;

  
@Column({ type: 'varchar', default: 'disponible' })
estado: 'disponible' | 'en uso';


  @OneToMany(() => MovimientoEquipo, movimientos => movimientos.id_prestamo)
  movimientos: MovimientoEquipo[];

  
}
