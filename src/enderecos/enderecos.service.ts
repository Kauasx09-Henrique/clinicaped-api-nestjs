import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private enderecosRepository: Repository<Endereco>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const user = await this.userRepository.findOne({ where: { id: createEnderecoDto.userId } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const endereco = this.enderecosRepository.create({ ...createEnderecoDto, user });
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
