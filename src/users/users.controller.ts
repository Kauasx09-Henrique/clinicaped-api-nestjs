import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  NotFoundException, BadRequestException, UseGuards, Request, // 👈 Importe o 'Request'
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

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
    
    // É uma boa prática mover a validação de senha para o service também.
    // Ex: const user = await this.usersService.validateUser(user_email, user_senha);
    const user = await this.usersService.findByEmail(user_email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    // 🚨 ALERTA DE SEGURANÇA: Esta comparação não é segura! Use bcrypt.
    if (user.user_senha !== user_senha) {
      throw new BadRequestException('Senha incorreta');
    }

    const payload = {
      sub: user.id,
      email: user.user_email,
      role: user.role,
    };
    
    // ✅ RESPOSTA DO LOGIN MELHORADA
    // Separamos a senha do resto dos dados do usuário para não enviá-la ao frontend.
    const { user_senha: _, ...userData } = user;

    return {
      message: 'Login realizado com sucesso',
      access_token: this.jwtService.sign(payload),
      user: userData, // Retornamos os dados do usuário para o frontend
    };
  }

  // ✅ NOVA ROTA PARA BUSCAR O PERFIL DO USUÁRIO LOGADO
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    // O `AuthGuard` junto com a `JwtStrategy` já validou o token e anexou
    // o usuário ao objeto `req`. Nós apenas o retornamos.
    // A senha já foi removida na sua JwtStrategy, então é seguro retornar `req.user`.
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