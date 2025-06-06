import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinica } from './entities/clinica.entity';
import { Endereco } from 'src/enderecos/entities/endereco.entity';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
import { Express } from 'express';



@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

async create(
  createClinicaDto: CreateClinicaDto & { enderecos?: any[] }
): Promise<Clinica> {
    
      if (!createClinicaDto.logo_clinica_url) {
    createClinicaDto.logo_clinica_url = 'https://br.pinterest.com/pin/87820261479192107/';
  }

  const clinica = this.clinicaRepository.create(createClinicaDto);
  const savedClinica = await this.clinicaRepository.save(clinica);

  


    if (createClinicaDto.enderecos && createClinicaDto.enderecos.length > 0) {
      const enderecos = createClinicaDto.enderecos.map((enderecoDto) => {
        const endereco = this.enderecoRepository.create({
          ...enderecoDto,
          clinica: savedClinica,
        });
        return endereco;
      });
      await this.enderecoRepository.save(enderecos);
    }

    const clinicaComEnderecos = await this.clinicaRepository.findOne({
      where: { id: savedClinica.id },
      relations: ['enderecos'],
    });

    if (!clinicaComEnderecos) {
      throw new NotFoundException('Clínica criada não encontrada');
    }

    return clinicaComEnderecos;
  }

  async findAll(): Promise<Clinica[]> {
    return this.clinicaRepository.find({ relations: ['enderecos'] });
  }

  async findOne(id: number): Promise<Clinica> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id },
      relations: ['enderecos'],
    });
    if (!clinica) {
      throw new NotFoundException(`Clínica com id ${id} não encontrada`);
    }
    return clinica;
  }

  async update(id: number, updateClinicaDto: UpdateClinicaDto): Promise<Clinica> {
    await this.clinicaRepository.update(id, updateClinicaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.clinicaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Clínica com id ${id} não encontrada`);
    }
    return { deleted: true };
  }
}
