import { Module } from '@nestjs/common';
import { MarcarConsultaService } from './marcar_consulta.service';
import { MarcarConsultaController } from './marcar_consulta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinica } from 'src/clinica/entities/clinica.entity';
import { User } from 'src/users/entities/user.entity';
import { MarcarConsulta } from './entities/marcar_consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinica, User, MarcarConsulta])
],
  controllers: [MarcarConsultaController],
  providers: [MarcarConsultaService],
 
})
export class MarcarConsultaModule {}
