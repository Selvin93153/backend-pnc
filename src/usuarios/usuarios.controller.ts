import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Roles } from '../common/decorators/roles.decorator'; // importa el decorador
import { RolesGuard } from '../common/guards/roles.guard';   // importa el guard
import { AuthGuard } from '@nestjs/passport'; // para usar el passport-jwt
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles('jefe','armero')
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto);
  }

  @Get()
  @Roles('jefe','armero')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, dto);
  }

  @Post('forgot-password')
  @Public()
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.usuariosService.forgotPassword(dto.correo);
  }

  @Post('reset-password')
  @Public()
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.usuariosService.resetPassword(dto.token, dto.newPassword);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}
