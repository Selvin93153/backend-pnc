import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoPropio } from './entities/movimiento-propio.entity';
import { CreateMovimientoEquipoDto } from './dto/create-movimiento-propio.dto';
import { UpdateMovimientoEquipoDto } from './dto/update-movimiento-propio.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EquipoAsignado } from 'src/equipos_asignados/entities/equipos-asignados.entity';

@Injectable()
export class MovimientosPropiosService {
  constructor(
    @InjectRepository(MovimientoPropio)
    private readonly movimientoRepo: Repository<MovimientoPropio>,
    @InjectRepository(EquipoAsignado)
    private readonly prestamoRepo: Repository<EquipoAsignado>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateMovimientoEquipoDto): Promise<MovimientoPropio> {
    
    const asignados = await this.prestamoRepo.findOneBy({ id_asignacion: dto.id_asignacion });
    const entrega = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario_entrega });
    const recibe = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario_recibe });

    if (!asignados || !entrega || !recibe) throw new NotFoundException('Datos no encontrados');

    const movimiento = this.movimientoRepo.create({
      ...dto,
      id_asignacion: asignados,
      id_usuario_entrega: entrega,
      id_usuario_recibe: recibe,
      fecha_entrega: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    hora_entrega: new Date().toTimeString().slice(0, 5), 
    });

    return this.movimientoRepo.save(movimiento);
  }

  findAll(): Promise<MovimientoPropio[]> {
    return this.movimientoRepo.find({ relations: ['id_asignacion', 'id_usuario_entrega', 'id_usuario_recibe'] });
  }

  async findOne(id: number): Promise<MovimientoPropio> {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id_movimiento: id },
      relations: ['id_asignacion', 'id_usuario_entrega', 'id_usuario_recibe'],
    });
    if (!movimiento) throw new NotFoundException('Movimiento no encontrado');
    return movimiento;
  }

  async update(id: number, dto: UpdateMovimientoEquipoDto): Promise<MovimientoPropio> {
  const movimiento = await this.findOne(id);

  if (dto.id_asignacion) {
    const asignados = await this.prestamoRepo.findOneBy({ id_asignacion: dto.id_asignacion });
    if (!asignados) throw new NotFoundException('Préstamo no encontrado');
    movimiento.id_asignacion = asignados;
  }

  if (dto.id_usuario_entrega) {
    const entrega = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario_entrega });
    if (!entrega) throw new NotFoundException('Usuario de entrega no encontrado');
    movimiento.id_usuario_entrega = entrega;
  }

  if (dto.id_usuario_recibe) {
    const recibe = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario_recibe });
    if (!recibe) throw new NotFoundException('Usuario receptor no encontrado');
    movimiento.id_usuario_recibe = recibe;
  }

  // Actualizar los campos del movimiento
  Object.assign(movimiento, dto);
  const movimientoActualizado = await this.movimientoRepo.save(movimiento);

  // 🔹 Si el estado se cambió a "disponible", actualizar también el préstamo
  if (dto.estado === 'guardado' && movimiento.id_asignacion) {
    movimiento.id_asignacion.estado = 'guardado';
    await this.prestamoRepo.save(movimiento.id_asignacion);
  }

  return movimientoActualizado;
}


  async remove(id: number): Promise<void> {
    const movimiento = await this.findOne(id);
    await this.movimientoRepo.remove(movimiento);
  }

    async findByNipRecibe(nip: string): Promise<MovimientoPropio[]> {
    const movimientos = await this.movimientoRepo.find({
      where: { id_usuario_recibe: { nip } },
      relations: ['id_asignacion', 'id_usuario_entrega', 'id_usuario_recibe'],
    });
  
    if (!movimientos.length) {
      
      return [];
    }
  
    return movimientos;
  }
}
