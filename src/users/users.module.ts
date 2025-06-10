// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // A configuração do JWT é feita diretamente aqui
    JwtModule.register({
      secret: '9u&>00H`j#}4Trd}V!,{', // A mesma chave secreta da JwtStrategy
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UsersController],
  // A JwtStrategy e o UsersService agora vivem no mesmo módulo
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}