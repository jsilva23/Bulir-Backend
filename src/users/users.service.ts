import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/util/roles';
import { CreateUserException } from 'src/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.fullName = createUserDto.fullName;
    user.nif = createUserDto.nif;

    try {
      const user = new User();
      user.fullName = createUserDto.fullName;
      user.nif = createUserDto.nif;
      user.email = createUserDto.email;
      user.role =
        createUserDto.role === Role.Client ? Role.Client : Role.Provider;
      user.passwordHash = await argon2.hash(createUserDto.password);

      return this.usersRepository.save(user);
    } catch (error) {
      Logger.error('Error registering user: ' + error.message);
      throw new CreateUserException(error.message);
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
