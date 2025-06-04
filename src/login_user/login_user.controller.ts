import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { LoginUserService } from './login_user.service';

@Controller('login')
export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService) {}

  @Post()
  async login(@Body() body: { email: string; senha: string }) {
    const { email, senha } = body;

    if (!email || !senha) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }

    const user = await this.loginUserService.validateUser(email, senha);

    if (!user) {
      throw new BadRequestException('Email ou senha inválidos');
    }

    // Aqui você pode retornar o usuário, token JWT, etc.
    return { message: 'Login realizado com sucesso', user };
  }
}
