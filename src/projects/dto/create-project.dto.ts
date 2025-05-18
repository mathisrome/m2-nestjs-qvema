import { IsNotEmpty, IsPositive } from 'class-validator';
import Category from '../category';
import { User } from 'src/users/entities/user.entity';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  budget: number;

  @IsNotEmpty()
  category: Category;

  owner: User;
}
