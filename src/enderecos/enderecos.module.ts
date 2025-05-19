import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endereco, User ])
  ],

  controllers: [EnderecosController],
  providers: [EnderecosService],
  exports: [EnderecosService]
})
export class EnderecosModule {}
