import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { Investment } from './entities/investment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { permissions } from './investements.permissions';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
  imports: [
    TypeOrmModule.forFeature([Investment]),
    CaslModule.forFeature({ permissions }),
    ProjectsModule,
  ],
  exports: [
    InvestmentsService
  ]
})
export class InvestmentsModule {}
