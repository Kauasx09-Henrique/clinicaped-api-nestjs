import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Repository } from 'typeorm';
import {  Clinica } from 'src/clinica/entities/clinica.entity';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private enderecosRepository: Repository<Endereco>,
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id: createEnderecoDto.clinicaId },
    });

    if (!clinica) {
      throw new Error('Clínica não encontrada');
    }

    const endereco = this.enderecosRepository.create({
      ...createEnderecoDto,
      clinica,
    });

    return this.enderecosRepository.save(endereco);
  }

  findAll() {
    return 'This action returns all enderecos';
  }

  findOne(id: number) {
    return `This action returns a #${id} endereco`;
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
