import { IsInt, IsString,  MaxLength} from 'class-validator';

export class CreateReporteDto {

  @IsInt()
  id_usuario: number;
  
  @IsString()
  @MaxLength(100)
  titulo: string;

  @IsString()
  @MaxLength(50000)
  descripcion: string;
}


