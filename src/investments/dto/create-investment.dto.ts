import { Exclude } from 'class-transformer';
import {
  IsDateString,
  isDateString,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateInvestmentDto {
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  projectId: string;

  investor: User;
  
  project: Project;
}
