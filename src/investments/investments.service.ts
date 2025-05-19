import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { Investment } from './entities/investment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
  ) {}

  create(createInvestmentDto: CreateInvestmentDto) {
    return plainToInstance(
      Investment,
      this.investmentsRepository.save(createInvestmentDto),
    );
  }

  findAll(userEmail: string) {
    return this.investmentsRepository.find({
      where: {
        investor: {
          email: userEmail,
        },
      },
    });
  }

  findByProject(project: Project) {
    return this.investmentsRepository.find({
      where: {
        project: {
          id: project.id,
        },
      },
    });
  }

  remove(id: string) {
    return this.investmentsRepository.delete(id);
  }
}
