import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto } from './dto/create-project.dto';
import Category from './category';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectsRepository.find();
  }

  findOne(id: string) {
    return this.projectsRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.projectsRepository.update(id, updateProjectDto);

    return this.findOne(id);
  }

  remove(id: string) {
    return this.projectsRepository.delete({ id });
  }

  findByInterests(interests: Category[]) {
    console.log(interests);

    const filters: { category: Category }[] = [];

    interests.forEach((interest) => filters.push({ category: interest }));

    console.log(filters);

    return this.projectsRepository.find({
      where: filters,
    });
  }

  findByUser(user: User) {
    return this.projectsRepository.find({
      relations: {
        owner: true,
      },
      where: {
        owner: {
          id: user.id,
        },
      },
    });
  }
}
