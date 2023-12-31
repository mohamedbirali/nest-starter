import { Module } from '@nestjs/common';
import { DashboardService } from './services';

@Module({
  controllers: [],
  providers: [DashboardService],
  exports: [DashboardService],
  imports: [],
})
export class DashboardModule {}
