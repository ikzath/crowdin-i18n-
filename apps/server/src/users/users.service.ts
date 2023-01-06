import { hash } from 'bcrypt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.persist(user).flush();
    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createUser(createUserInput: Partial<User>) {
    const user = this.userRepository.create(createUserInput);

    // TODO Validate email and password
    // const result = await this.db.collection('users').insertOne(userData);
    // const user = await this.db.collection('users').findOne(result.insertedId);
    await this.userRepository.persist(user).flush();
    return user;
  }
}
