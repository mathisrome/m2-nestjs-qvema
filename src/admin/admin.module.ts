import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { InvestmentsModule } from '../investments/investments.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [AdminController],
  imports: [InvestmentsModule, ProjectsModule],
})
export class AdminModule {}
