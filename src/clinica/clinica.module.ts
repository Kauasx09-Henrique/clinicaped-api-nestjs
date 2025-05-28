import { Module } from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { ClinicaController } from './clinica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinica } from './entities/clinica.entity';
import { MarcarConsulta } from 'src/marcar_consulta/entities/marcar_consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinica, MarcarConsulta])], 
  controllers: [ClinicaController],
  providers: [ClinicaService],
})
export class ClinicaModule { }
