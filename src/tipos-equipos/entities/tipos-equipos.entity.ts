import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EquipoAsignado } from 'src/equipos_asignados/entities/equipos-asignados.entity';
import { EquipoPrestamo } from 'src/equipos_prestamo/entities/equipos-prestamo.entity';

@Entity('tipos_equipos')
export class TipoEquipo {
  @PrimaryGeneratedColumn()
  id_tipo: number;

  @Column({ length: 50 })
  nombre: string;

  @OneToMany(() => EquipoAsignado, equipo => equipo.id_tipo)
  equipos: EquipoAsignado[];

  @OneToMany(() => EquipoPrestamo, prestamo => prestamo.id_tipo)
  equiposPrestamo: EquipoAsignado[];
}
