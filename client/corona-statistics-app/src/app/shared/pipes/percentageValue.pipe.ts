import { DailyStatistics } from './../models/statisticsDataModels/dailyStatistics.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'percentageValue' })
export class PercentageValuePipe implements PipeTransform {
  transform(dailyStatistics: DailyStatistics): string {
    const res =
      ((dailyStatistics.identified / dailyStatistics.tests) * 100).toFixed(1) +
      '%';
    return res;
  }
}
