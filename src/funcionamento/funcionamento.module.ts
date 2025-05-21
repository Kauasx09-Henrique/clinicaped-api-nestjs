import { Module } from '@nestjs/common';
import { FuncionamentoService } from './funcionamento.service';
import { FuncionamentoController } from './funcionamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionamento } from './entities/funcionamento.entity';
import { Clinica } from 'src/clinica/entities/clinica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionamento, Clinica ])
  ],
  controllers: [FuncionamentoController],
  providers: [FuncionamentoService],
})
export class FuncionamentoModule {}
