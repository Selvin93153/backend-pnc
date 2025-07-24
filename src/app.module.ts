import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ReportesModule } from './reportes/reportes.module';
import { TiposEquiposModule } from './tipos-equipos/tipos-equipos.module';
import { EquiposAsignadosModule } from './equipos_asignados/equipos-asignados.module';
import { EquiposPrestamoModule } from './equipos_prestamo/equipos-prestamo.module';
import { MovimientosEquiposModule } from './movimientos_equipos/movimientos-equipos.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { ControlModule } from './control/control.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que las variables estén disponibles en todo el proyecto
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432', 10),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Solo para desarrollo
      }),
    }),

    RolesModule,
    UsuariosModule,
    ReportesModule,
    TiposEquiposModule,
    EquiposAsignadosModule,
    EquiposPrestamoModule,
    MovimientosEquiposModule,
    VehiculosModule,
    ControlModule,
    MantenimientoModule,
  ],
})
export class AppModule {}
