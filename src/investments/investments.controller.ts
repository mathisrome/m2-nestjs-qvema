import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UseAbility, Actions } from 'nest-casl';
import { Investment } from './entities/investment.entity';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';
import { plainToInstance } from 'class-transformer';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(
    private readonly investmentsService: InvestmentsService,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @Roles('investor', 'admin')
  async create(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @Request() req,
  ) {
    const user = await this.usersService.findOneByEmail(req.user.email);

    if (!user) {
      throw new NotFoundException();
    }

    createInvestmentDto.investor = user;

    const project = await this.projectsService.findOne(
      createInvestmentDto.projectId,
    );

    if (!project) {
      throw new NotFoundException();
    }

    createInvestmentDto.project = project;

    return plainToInstance(
      Investment,
      this.investmentsService.create(createInvestmentDto),
    );
  }

  @Get()
  @Roles('investor', 'admin')
  async findAll(@Request() req) {
    return this.investmentsService.findAll(req.user.email);
  }

  @Delete(':id')
  @Roles('investor', 'admin')
  @UseAbility(Actions.delete, Investment)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.investmentsService.remove(id);
  }

  @Get('/project/:id')
  async project(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id);

    if (!project) {
      throw new NotFoundException();
    }

    return this.investmentsService.findByProject(project);
  }
}
