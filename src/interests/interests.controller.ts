import { Controller, Get } from '@nestjs/common';
import Category from 'src/projects/category';

@Controller('interests')
export class InterestsController {
  @Get()
  findAll() {
    return Object.values(Category);
  }
}
