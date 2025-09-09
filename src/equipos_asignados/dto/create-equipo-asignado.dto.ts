import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateEquipoAsignadoDto {

  @IsNotEmpty()
  @IsString()
  clase: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  calibre?: string;

  @IsNotEmpty()
  @IsString()
  serie: string;

   @IsOptional()
    @IsEnum(['guardado', 'en uso'], {
      message: 'El estado debe ser "guardado" o "en uso"',
    })
    estado?: 'guardado' | 'en uso';

  @IsNotEmpty()
  @IsNumber()
  id_tipo: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}
