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
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Roles('entrepreneur')
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    createProjectDto.owner = plainToInstance(
      User,
      await this.usersService.findOneByEmail(req.user.email),
    );

    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.update, UpdateProjectDto)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return plainToInstance(
      Project,
      this.projectsService.update(id, updateProjectDto),
    );
  }

  @Delete(':id')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.delete, Project, [
    ProjectsService,
    async (service: ProjectsService, { params }) => {
      return await service.findOne(params.id);
    },
  ])
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
