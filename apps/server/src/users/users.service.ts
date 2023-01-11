import { hash } from 'bcrypt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('No such user');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('No such user');
    }
    return user;
  }

  // Update user with email (must password be updated?)
  // async update(updateUserDto: UpdateUserDto) {
  //   const user = await this.userRepository.findOne(updateUserDto.id);
  //   if (!user) {
  //     return { message: 'No such user' };
  //   }
  //   user.email = updateUserDto.email;
  //   try {
  //     if (user) {
  //       await this.userRepository.persistAndFlush(user);
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  //   return user;
  // }

  suspend(id: number) {
    return `This action suspends a #${id} user`;
  }

  archive(id: number) {
    return `This action archives a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Http error - No such user found');
    }
    try {
      await this.userRepository.removeAndFlush(user);
    } catch (error) {
      throw new NotFoundException('DB Error', error);
    }
    return user;
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
