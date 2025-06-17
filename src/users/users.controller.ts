import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // 👈 1. Importado para comparar senhas

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // IMPORTANTE: A criptografia da senha (com bcrypt) deve ser feita no seu service.
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { user_email: string; user_senha: string }) {
    const { user_email, user_senha } = body;

    const user = await this.usersService.findByEmail(user_email);

    if (!user) {
      // Usamos uma mensagem genérica por segurança
      throw new BadRequestException('E-mail ou senha incorretos');
    }

    // 👇 2. A comparação de senha foi corrigida para usar bcrypt
    const isPasswordMatching = await bcrypt.compare(user_senha, user.user_senha);

    if (!isPasswordMatching) {
      // Mensagem genérica para não informar se o erro foi no e-mail ou na senha
      throw new BadRequestException('E-mail ou senha incorretos');
    }

    // Se chegou aqui, o login é válido.
    const payload = {
      sub: user.id,
      email: user.user_email,
      role: user.role,
    };

    // Remove a senha do objeto antes de enviá-lo na resposta
    const { user_senha: _, ...userData } = user;

    return {
      message: 'Login realizado com sucesso',
      access_token: this.jwtService.sign(payload),
      user: userData,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    // A senha já foi removida na sua JwtStrategy, então é seguro retornar req.user.
    return req.user;
  }

  @Get('dados')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}