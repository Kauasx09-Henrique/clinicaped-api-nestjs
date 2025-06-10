import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 async create(createUserDto: CreateUserDto): Promise<User> {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(createUserDto.user_senha, salt);
  // Salve o hashedPassword no lugar da senha original
  const user = this.userRepository.create({ ...createUserDto, user_senha: hashedPassword });
  return this.userRepository.save(user);
  }
  async validateUser(email: string, pass: string): Promise<any> {
  const user = await this.findByEmail(email);
  if (user && (await bcrypt.compare(pass, user.user_senha))) {
    const { user_senha, ...result } = user;
    return result; // Retorna o usuário sem a senha
  }
  return null;
}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

 async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { user_email: email } });
}

}
