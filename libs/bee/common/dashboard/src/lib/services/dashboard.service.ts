import { Injectable } from '@nestjs/common';
import { DashboardDto } from '../dtos/dashboard';
import { IDashboardStartAndEndDate } from '../interfaces/dashboard.interface';
import { IDashboardService } from '../interfaces/dashboard.service.interface';
import { HelperDateService } from '@bee/common/helper'; ///services/helper.date.service';
import { HelperNumberService } from '@bee/common/helper'; ///services/helper.number.service';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    private readonly helperDateService: HelperDateService,
    private readonly helperNumberService: HelperNumberService,
  ) {}

  getStartAndEndDate(date?: DashboardDto): IDashboardStartAndEndDate {
    const today = this.helperDateService.create();

    let { startDate, endDate } = date;

    if (!startDate && !endDate) {
      startDate = this.helperDateService.startOfYear(today);
      endDate = this.helperDateService.endOfYear(today);
    } else {
      if (!startDate) {
        startDate = this.helperDateService.startOfYear();
      } else {
        startDate = this.helperDateService.startOfDay(startDate);
      }

      if (!endDate) {
        endDate = this.helperDateService.endOfYear();
      } else {
        endDate = this.helperDateService.endOfDay(endDate);
      }
    }

    return {
      startDate,
      endDate,
    };
  }

  getPercentage(value: number, total: number): number {
    return this.helperNumberService.percent(value, total);
  }
}
