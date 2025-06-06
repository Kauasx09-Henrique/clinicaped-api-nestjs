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
} from '@nestjs/common';
import { UsersService } from './users.service'; // ✅ Correção aqui
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('dados')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body() body: { user_email: string; user_senha: string }) {
    const { user_email, user_senha } = body;

    const user = await this.usersService.findByEmail(user_email); // ✅ Busca por email
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.user_senha !== user_senha) {
      throw new BadRequestException('Senha incorreta');
    }

    return {
      message: 'Login realizado com sucesso',
      user,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
