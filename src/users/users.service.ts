import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { InterestsUserDto } from './dto/interests-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.plainPassword.length > 0) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.plainPassword,
        bcrypt.genSaltSync(10),
      );
    }

    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.plainPassword) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.plainPassword,
        bcrypt.genSaltSync(10),
      );
    }

    this.usersRepository.update(email, updateUserDto);

    return this.findOneByEmail(email);
  }

  remove(id: string) {
    return this.usersRepository.delete({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  updateInterests(user: User, interests: InterestsUserDto) {
    user.interests = interests.interests;

    this.usersRepository.save(user);
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
