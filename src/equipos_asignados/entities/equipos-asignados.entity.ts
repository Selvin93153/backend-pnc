import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { TipoEquipo } from '../../tipos-equipos/entities/tipos-equipos.entity';

@Entity('equipos_asignados')
export class EquipoAsignado {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column({ length: 50 })
  clase: string;

  @Column({ length: 50, nullable: true })
  marca: string;

  @Column({ length: 20, nullable: true })
  calibre: string;

  @Column({ length: 50, unique: true })
  serie: string;

  @ManyToOne(() => TipoEquipo, tipo => tipo.equipos, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_tipo' })  
  id_tipo: TipoEquipo;

  @ManyToOne(() => Usuario, usuario => usuario.equipos, { onDelete: 'SET NULL' })
   @JoinColumn({ name: 'id_usuario' })  
  id_usuario: Usuario;
}
