import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinica } from './entities/clinica.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { ClinicaService } from './clinica.service';
import { ClinicaController } from './clinica.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinica, Endereco]),  
  ],
  providers: [ClinicaService],
  controllers: [ClinicaController],
  exports: [ClinicaService],
})
export class ClinicaModule {}
