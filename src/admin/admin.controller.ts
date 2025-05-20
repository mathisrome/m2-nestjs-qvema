import { Controller, Delete, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { InvestmentsService } from '../investments/investments.service';
import { Investment } from '../investments/entities/investment.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly investmentsService: InvestmentsService,
  ) {
  }

  @Get('/users')
  @Roles('admin')
  users() {
    return plainToInstance(User, this.usersService.findAll());
  }

  @Delete('/users/:id')
  @Roles('admin')
  delete_user(@Param('id') id: string) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.delete(id)
  }

  @Get('/investments')
  @Roles('admin')
  investments() {
    return plainToInstance(Investment, this.investmentsService.findAll())
  }
}
