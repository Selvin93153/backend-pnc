import { IsEnum, IsInt, IsOptional, IsString,  MaxLength} from 'class-validator';

export class CreateEquiposPrestamoDto {

  
   @IsString()
  @MaxLength(50)
  clase?: string;
 
   @IsString()
  @MaxLength(50)
  marca?: string;

   @IsString()
  @MaxLength(50)
  calibre?: string;

   @IsString()
  @MaxLength(50)
  serie: string;
  
   @IsInt()
  id_tipo: number;

   @IsOptional()
  @IsEnum(['disponible', 'en uso'], {
    message: 'El estado debe ser "disponible" o "en uso"',
  })
  estado?: 'disponible' | 'en uso';
}
