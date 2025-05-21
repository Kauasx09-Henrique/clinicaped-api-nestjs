import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinica } from './entities/clinica.entity';
import { CreateClinicaDto } from './dto/create-clinica.dto';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,
  ) {}

  async create(createClinicaDto: CreateClinicaDto): Promise<Clinica> {
    const clinica = this.clinicaRepository.create(createClinicaDto);
    return await this.clinicaRepository.save(clinica);
  }

  findAll() {
    return this.clinicaRepository.find();
  }

  findOne(id: number) {
    return this.clinicaRepository.findOneBy({ id });
  }

  async update(id: number, updateClinicaDto: Partial<CreateClinicaDto>) {
    await this.clinicaRepository.update(id, updateClinicaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.clinicaRepository.delete(id);
    return { deleted: true };
  }
}
