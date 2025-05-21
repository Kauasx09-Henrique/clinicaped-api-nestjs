import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Clinica } from 'src/clinica/entities/clinica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endereco, Clinica ])
  ],

  controllers: [EnderecosController],
  providers: [EnderecosService],
  exports: [EnderecosService]
})
export class EnderecosModule {}
