import { DashboardDto } from '../dtos/dashboard';
import { IDashboardStartAndEndDate } from '../interfaces/dashboard.interface';

export interface IDashboardService {
  getStartAndEndDate(date?: DashboardDto): IDashboardStartAndEndDate;
  getPercentage(value: number, total: number): number;
}
