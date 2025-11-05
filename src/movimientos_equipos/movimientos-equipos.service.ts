import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoEquipo } from './entities/movimiento-equipo.entity';
import { CreateMovimientoEquipoDto } from './dto/create-movimiento-equipo.dto';
import { UpdateMovimientoEquipoDto } from './dto/update-movimiento-equipo.dto';
import { EquipoPrestamo } from '../equipos_prestamo/entities/equipos-prestamo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class MovimientosEquiposService {
  constructor(
    @InjectRepository(MovimientoEquipo)
    private readonly movimientoRepo: Repository<MovimientoEquipo>,
    @InjectRepository(EquipoPrestamo)
    private readonly prestamoRepo: Repository<EquipoPrestamo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

async create(dto: CreateMovimientoEquipoDto): Promise<MovimientoEquipo> {
  const prestamo = await this.prestamoRepo.findOneBy({ id_prestamo: dto.id_prestamo });
  const entrega = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario_entrega });
  const recibe = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario_recibe });

  if (!prestamo || !entrega || !recibe) {
    throw new NotFoundException('Datos no encontrados');
  }

  // Obtener fecha y hora local de Guatemala
  const ahora = new Date();

  const fechaLocal = ahora
    .toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' })
    .split('/')
    .reverse()
    .join('-'); // convierte DD/MM/YYYY → YYYY-MM-DD

  const horaLocal = ahora.toLocaleTimeString('es-GT', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Guatemala',
  });

  const movimiento = this.movimientoRepo.create({
    ...dto,
    id_prestamo: prestamo,
    id_usuario_entrega: entrega,
    id_usuario_recibe: recibe,
    fecha_entrega: fechaLocal, //  Fecha local correcta
    hora_entrega: horaLocal,   // Hora local correcta
  });

  return this.movimientoRepo.save(movimiento);
}

  findAll(): Promise<MovimientoEquipo[]> {
    return this.movimientoRepo.find({ relations: ['id_prestamo', 'id_usuario_entrega', 'id_usuario_recibe'] });
  }

  async findOne(id: number): Promise<MovimientoEquipo> {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id_movimiento: id },
      relations: ['id_prestamo', 'id_usuario_entrega', 'id_usuario_recibe'],
    });
    if (!movimiento) throw new NotFoundException('Movimiento no encontrado');
    return movimiento;
  }

  async update(id: number, dto: UpdateMovimientoEquipoDto): Promise<MovimientoEquipo> {
  const movimiento = await this.findOne(id);

  if (dto.id_prestamo) {
    const prestamo = await this.prestamoRepo.findOneBy({ id_prestamo: dto.id_prestamo });
    if (!prestamo) throw new NotFoundException('Préstamo no encontrado');
    movimiento.id_prestamo = prestamo;
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
  if (dto.estado === 'disponible' && movimiento.id_prestamo) {
    movimiento.id_prestamo.estado = 'disponible';
    await this.prestamoRepo.save(movimiento.id_prestamo);
  }

  return movimientoActualizado;
}


  async remove(id: number): Promise<void> {
    const movimiento = await this.findOne(id);
    await this.movimientoRepo.remove(movimiento);
  }

  async findByNipRecibe(nip: string): Promise<MovimientoEquipo[]> {
  const movimientos = await this.movimientoRepo.find({
    where: { id_usuario_recibe: { nip } },
    relations: ['id_prestamo', 'id_usuario_entrega', 'id_usuario_recibe'],
  });

  if (!movimientos.length) {
    
    return [];
  }

  return movimientos;
}


async findPrestamosEnUsoPorUsuario(id_usuario: number) {
  // Buscamos los movimientos donde el usuario recibe el equipo y el estado es "en uso"
  const movimientos = await this.movimientoRepo.find({
    where: { 
      id_usuario_recibe: { id_usuario },
      estado: 'en uso',
    },
    relations: ['id_prestamo'],
  });

  // Retornamos solo los campos del préstamo
  const prestamos = movimientos.map(mov => ({
    id_prestamo: mov.id_prestamo.id_prestamo,
    clase: mov.id_prestamo.clase,
    marca: mov.id_prestamo.marca,
    calibre: mov.id_prestamo.calibre,
    serie: mov.id_prestamo.serie,
    estado: mov.id_prestamo.estado,
  }));

  return {
    total: prestamos.length,
    prestamos,
  };
}
}


