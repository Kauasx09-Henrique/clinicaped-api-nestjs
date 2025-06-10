import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Repository } from 'typeorm';
import { Clinica } from 'src/clinica/entities/clinica.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateEnderecoDto: UpdateEnderecoDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id: createEnderecoDto.clinicaId },
    });
    if (!clinica) {
      throw new NotFoundException('Clínica não encontrada');
    }
    const endereco = this.enderecoRepository.create({
      ...createEnderecoDto,
      clinica,
    });
    return this.enderecoRepository.save(endereco);
  }

  async findByClinicaId(clinicaId: number): Promise<Endereco[]> {
    return this.enderecoRepository.find({
      where: { clinica: { id: clinicaId } },
    });
  }
}
