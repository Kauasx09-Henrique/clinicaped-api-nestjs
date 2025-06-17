import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcarConsultaService } from './marcar_consulta.service';
import { MarcarConsultaController } from './marcar_consulta.controller';
import { MarcarConsulta } from './entities/marcar_consulta.entity';
import { User } from 'src/users/entities/user.entity';
import { Clinica } from 'src/clinica/entities/clinica.entity';

@Module({
  imports: [
    // Disponibiliza os repositórios para o Service.
    // É crucial importar User e Clinica aqui também!
    TypeOrmModule.forFeature([
      MarcarConsulta, 
      User, 
      Clinica 
    ])
  ],
  controllers: [MarcarConsultaController],
  providers: [MarcarConsultaService],
})
export class MarcarConsultaModule {}