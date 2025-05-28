import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { InterestsUserDto } from './dto/interests-user.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return plainToInstance(User, this.usersService.create(createUserDto));
  }

  @Get()
  @Roles('admin')
  findAll() {
    return plainToInstance(User, this.usersService.findAll());
  }

  @Get('/profile')
  profile(@Request() req) {
    return plainToInstance(
      User,
      this.usersService.findOneByEmail(req.user.email),
    );
  }

  @Put('/profile')
  update_profile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return plainToInstance(
      User,
      this.usersService.update(req.user.email, updateUserDto),
    );
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('/interests')
  async interests(@Request() req) {
    const user = await this.usersService.findOneByEmail(req.user.email);

    if (!user) {
      throw new NotFoundException();
    }

    return user.interests ?? [];
  }

  @Post('/interests')
  async updateInterests(@Request() req, @Body() interests: InterestsUserDto) {
    const user = await this.usersService.findOneByEmail(req.user.email);

    if (!user) {
      throw new NotFoundException();
    }

    this.usersService.updateInterests(user, interests);

    return user.interests;
  }
}
