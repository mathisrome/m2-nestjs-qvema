import { IsNotEmpty, IsPositive } from 'class-validator';
import Category from '../category';

export class UpdateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  budget: number;

  @IsNotEmpty()
  category: Category;

  ownerId: number;
}
