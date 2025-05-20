import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { InvestmentsModule } from '../investments/investments.module';

@Module({
  controllers: [AdminController],
  imports: [InvestmentsModule]
})
export class AdminModule {}
