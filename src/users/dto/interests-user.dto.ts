import { IsNotEmpty } from 'class-validator';
import Category from 'src/projects/category';

export class InterestsUserDto {
  @IsNotEmpty()
  interests: Category[];
}
