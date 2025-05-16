import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const newUser = await this.userRepository.save(user);
    return newUser;
  }


  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const userSearch = await this.userRepository.findOne({ where: { id } });
    if (!userSearch) {
      throw new NotFoundException('Carro não encontrado!');
    }
    return userSearch;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userSearch = await this.findOne(id);
    Object.assign(userSearch, updateUserDto);
    return await this.userRepository.save(userSearch);
  }

  async remove(id: number): Promise<void> {
    const userSearch = await this.findOne(id);
    await this.userRepository.remove(userSearch)
  }
}