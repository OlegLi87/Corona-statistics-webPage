import { IdentifiedOutsideSpreadness } from './../models/statisticsDataModels/identifiedOutsideSpreadness.model';
import { SickSerious } from './../models/statisticsDataModels/sickSerious.model';
import { IdentifiedChangeTrend } from './../models/statisticsDataModels/identifiedChangeTrend.model';
import { DailyChangeTrendData } from './../models/statisticsDataModels/dailyChangeTrendData.model';
import { DailyStatistics } from './../models/statisticsDataModels/dailyStatistics.model';
import { LatestUpdateTime } from '../models/statisticsDataModels/latestUpdateTime.model';
import { StatisticsDataType } from './../models/statisticsDataType';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private latestUpdateTimeData: LatestUpdateTime;
  private dailyStatisticsData: DailyStatistics;
  private dailyChangeTrendData: Array<DailyChangeTrendData>;
  private identifiedChangeTrendData: Array<IdentifiedChangeTrend>;
  private sickSeriousData: Array<SickSerious>;
  private identifiedOutsideSpreadnessData: Array<IdentifiedOutsideSpreadness>;

  latestUpdateTimeDataUpdated = new Subject<LatestUpdateTime>();
  dailyStatisticsDataUpdated = new Subject<DailyStatistics>();
  dailyChangeTrendDataUpdated = new Subject<Array<DailyChangeTrendData>>();
  identifiedChangeTrendDataUpdated = new Subject<
    Array<IdentifiedChangeTrend>
  >();
  sickSeriousDataUpdated = new Subject<Array<SickSerious>>();
  identifiedOutsideSpreadnessDataUpdated = new Subject<
    Array<IdentifiedOutsideSpreadness>
  >();

  updateStatisticsData(data: any, statisticsDataType: StatisticsDataType) {
    switch (statisticsDataType) {
      case StatisticsDataType.LatestUpdateTime: {
        this.latestUpdateTimeData = data[0];
        this.latestUpdateTimeDataUpdated.next(this.latestUpdateTimeData);
        break;
      }
      case StatisticsDataType.DailyStatistics: {
        this.dailyStatisticsData = data[0];
        this.dailyStatisticsDataUpdated.next(this.dailyStatisticsData);
        break;
      }
      case StatisticsDataType.RespiratoryOverall:
      case StatisticsDataType.DeathsOverall:
      case StatisticsDataType.TestsOverall: {
        this.dailyChangeTrendData = new Array<DailyChangeTrendData>();
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
        break;
      }
      case StatisticsDataType.IdentifiedChangeTrend: {
        this.identifiedChangeTrendData = data;
        this.identifiedChangeTrendDataUpdated.next(
          this.identifiedChangeTrendData
        );
        break;
      }
      case StatisticsDataType.SickSerious: {
        this.sickSeriousData = data;
        this.sickSeriousDataUpdated.next(this.sickSeriousData);
        break;
      }
      case StatisticsDataType.IdentifiedOutsideSpreadness: {
        this.identifiedOutsideSpreadnessData = data;
        this.identifiedOutsideSpreadnessDataUpdated.next(
          this.identifiedOutsideSpreadnessData
        );
        break;
      }
    }
  }
}
