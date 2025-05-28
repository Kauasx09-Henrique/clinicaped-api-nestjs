import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcarConsultaDto } from './dto/create-marcar_consulta.dto';
import { UpdateMarcarConsultaDto } from './dto/update-marcar_consulta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinica } from 'src/clinica/entities/clinica.entity';
import { Repository } from 'typeorm';
import { MarcarConsulta } from './entities/marcar_consulta.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MarcarConsultaService {
  constructor(
    @InjectRepository(MarcarConsulta)
    private readonly marcaConsultaRepository: Repository<MarcarConsulta>,

    @InjectRepository(Clinica)
    private readonly clinicaRepository: Repository<Clinica>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMarcarConsultaDto: CreateMarcarConsultaDto): Promise<MarcarConsulta> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id: createMarcarConsultaDto.clinicaId },
    });

    if (!clinica) {
      throw new NotFoundException('Clínica não encontrada');
    }

    const user = await this.userRepository.findOne({
      where: { id: createMarcarConsultaDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const marcarConsulta = this.marcaConsultaRepository.create({
      data_consulta: createMarcarConsultaDto.data_consulta,
      horario_consulta: createMarcarConsultaDto.horario_consulta,
      motivo_consulta: createMarcarConsultaDto.motivo_consulta,
      clinica,
      user,
    });

    return await this.marcaConsultaRepository.save(marcarConsulta);
  }

  async findAll(): Promise<MarcarConsulta[]> {
    return await this.marcaConsultaRepository.find({ relations: ['clinica', 'user'] });
  }

  async findOne(id: number): Promise<MarcarConsulta> {
    const consulta = await this.marcaConsultaRepository.findOne({
      where: { id },
      relations: ['clinica', 'user'],
    });

    if (!consulta) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
    }

    return consulta;
  }

  async update(id: number, updateMarcarConsultaDto: UpdateMarcarConsultaDto): Promise<MarcarConsulta> {
    const consulta = await this.findOne(id);

    Object.assign(consulta, updateMarcarConsultaDto);

    return await this.marcaConsultaRepository.save(consulta);
  }

  async remove(id: number): Promise<void> {
    const consulta = await this.findOne(id);

    await this.marcaConsultaRepository.remove(consulta);
  }
}
