import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('reportes')
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

 @ManyToOne(() => Usuario, usuario => usuario.reportes, { onDelete: 'SET NULL' })
@JoinColumn({ name: 'id_usuario' })  
id_usuario: Usuario;


  @Column({ length: 100 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
  
  @Column({ default: false })
  visto: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;
}
