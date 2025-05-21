import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionamentoDto } from './dto/create-funcionamento.dto';
import { UpdateFuncionamentoDto } from './dto/update-funcionamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinica } from '../clinica/entities/clinica.entity';
import { funcionamento } from './entities/funcionamento.entity';

@Injectable()
export class FuncionamentoService {
  constructor(
    @InjectRepository(funcionamento)
    private funcionamentoRepository: Repository<funcionamento>,
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,
  ) {}

  async create(createFuncionamentoDto: CreateFuncionamentoDto): Promise<funcionamento> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id: createFuncionamentoDto.clinicaId },
    });

    if (!clinica) {
      throw new NotFoundException('Clínica não encontrada');
    }

    const funcionamento = this.funcionamentoRepository.create({
      ...createFuncionamentoDto,
      clinica,
    });

    return this.funcionamentoRepository.save(funcionamento);
  }

  findAll() {
    return `This action returns all funcionamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funcionamento`;
  }

  async update(id: number, updateFuncionamentoDto: UpdateFuncionamentoDto): Promise<funcionamento> {
    return Promise.reject(new Error(`This action updates a #${id} funcionamento - Not implemented`));
  }

  async remove(id: number): Promise<void> {
    return Promise.reject(new Error(`This action removes a #${id} funcionamento - Not implemented`));
  }
}