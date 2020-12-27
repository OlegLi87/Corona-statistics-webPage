import { DailyChangeTrendData } from './../models/statisticsDataModels/dailyChangeTrendData.model';
import { DailyStatistics } from './../models/statisticsDataModels/dailyStatistics.model';
import { LatestUpdateTime } from '../models/statisticsDataModels/latestUpdateTime.model';
import { StatisticsDataType } from './../models/statisticsDataType';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private latestUpdateTime: LatestUpdateTime;
  private dailyStatistics: DailyStatistics;
  private dailyChangeTrendData = new Array<DailyChangeTrendData>();

  latestUpdateTimeUpdated = new Subject<LatestUpdateTime>();
  dailyStatisticsUpdated = new Subject<DailyStatistics>();
  dailyChangeTrendDataUpdated = new Subject<Array<DailyChangeTrendData>>();

  updateStatisticsData(data: any, statisticsDataType: StatisticsDataType) {
    switch (statisticsDataType) {
      case StatisticsDataType.LatestUpdateTime: {
        this.latestUpdateTime = data[0];
        this.latestUpdateTimeUpdated.next(this.latestUpdateTime);
        break;
      }
      case StatisticsDataType.DailyStatistics: {
        this.dailyStatistics = data[0];
        this.dailyStatisticsUpdated.next(this.dailyStatistics);
        break;
      }
      case StatisticsDataType.RespiratoryOverall:
      case StatisticsDataType.DeathsOverall:
      case StatisticsDataType.TestsOverall: {
        data.forEach((el) => {
          let obj = { date: null, amount: null };
          for (const prop in el) {
            if (prop === '_id') continue;
            else if (prop === 'date') obj.date = el[prop] as Date;
            else obj.amount = el[prop] as number;
          }
          this.dailyChangeTrendData.push(obj);
        });
        this.dailyChangeTrendDataUpdated.next(this.dailyChangeTrendData);
        this.dailyChangeTrendData = new Array<DailyChangeTrendData>();
        break;
      }
    }
  }
}
