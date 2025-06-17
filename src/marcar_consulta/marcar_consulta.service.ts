import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcarConsulta } from './entities/marcar_consulta.entity';
import { CreateMarcarConsultaDto } from './dto/create-marcar_consulta.dto';
import { UpdateMarcarConsultaDto } from './dto/update-marcar_consulta.dto';
import { User } from 'src/users/entities/user.entity';
import { Clinica } from 'src/clinica/entities/clinica.entity';

@Injectable()
export class MarcarConsultaService {
  constructor(
    @InjectRepository(MarcarConsulta)
    private readonly consultaRepository: Repository<MarcarConsulta>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Clinica)
    private readonly clinicaRepository: Repository<Clinica>,
  ) {}

  async create(createDto: CreateMarcarConsultaDto): Promise<MarcarConsulta> {
    const { userId, clinicaId, ...consultaData } = createDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }

    const clinica = await this.clinicaRepository.findOneBy({ id: clinicaId });
    if (!clinica) {
      throw new NotFoundException(`Clínica com ID ${clinicaId} não encontrada.`);
    }

    const novaConsulta = this.consultaRepository.create({
      ...consultaData,
      user, 
      clinica,
    });

    return this.consultaRepository.save(novaConsulta);
  }
  
  async findAll(): Promise<MarcarConsulta[]> {
    return this.consultaRepository.find({ relations: ['user', 'clinica'] });
  }

  async findOne(id: number): Promise<MarcarConsulta> {
    const consulta = await this.consultaRepository.findOne({ where: { id }, relations: ['user', 'clinica'] });
    if (!consulta) { throw new NotFoundException(`Consulta com ID ${id} não encontrada.`); }
    return consulta;
  }

  async update(id: number, updateDto: UpdateMarcarConsultaDto): Promise<MarcarConsulta> {
    const consulta = await this.consultaRepository.preload({ id, ...updateDto });
    if (!consulta) { throw new NotFoundException(`Consulta com ID ${id} não encontrada.`); }
    return this.consultaRepository.save(consulta);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.consultaRepository.delete(id);
    if (result.affected === 0) { throw new NotFoundException(`Consulta com ID ${id} não encontrada.`); }
    return { message: `Consulta com ID ${id} removida com sucesso.` };
  }
}