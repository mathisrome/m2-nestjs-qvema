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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return plainToInstance(User, this.usersService.create(createUserDto));
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
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
}
