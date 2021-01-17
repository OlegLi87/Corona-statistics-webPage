import { WeeklyTests } from './../models/statisticsDataModels/weeklyTests.model';
import { EpidemicCurve } from './../models/statisticsDataModels/epidemicCurve.model';
import { IdentifiedOutsideSpreadness } from './../models/statisticsDataModels/identifiedOutsideSpreadness.model';
import { SickSerious } from './../models/statisticsDataModels/sickSerious.model';
import { IdentifiedChangeTrend } from './../models/statisticsDataModels/identifiedChangeTrend.model';
import { DailyChangeTrendData } from './../models/statisticsDataModels/dailyChangeTrendData.model';
import { DailyStatistics } from './../models/statisticsDataModels/dailyStatistics.model';
import { StatisticsDataType } from './../models/statisticsDataType';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RespiratoryAndSickSerious } from '../models/statisticsDataModels/respiratoryAndSickSerious.model';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private respiratoryAndSickSeriousData: Array<RespiratoryAndSickSerious>;
  private epidemicCurveData: Array<EpidemicCurve>;

  latestUpdateTimeDataUpdated = new Subject<Date>();
  dailyStatisticsDataUpdated = new Subject<DailyStatistics>();
  dailyChangeTrendDataUpdated = new Subject<Array<DailyChangeTrendData>>();
  identifiedChangeTrendDataUpdated = new Subject<
    Array<IdentifiedChangeTrend>
  >();
  sickSeriousDataUpdated = new Subject<Array<SickSerious>>();
  identifiedOutsideSpreadnessDataUpdated = new Subject<
    Array<IdentifiedOutsideSpreadness>
  >();
  respiratoryAndSickSeriousDataUpdated = new Subject<
    Array<RespiratoryAndSickSerious>
  >();
  epidemicCurveDataUpdated = new Subject<Array<EpidemicCurve>>();
  weeklyTestsDataUpdated = new Subject<Array<WeeklyTests>>();

  updateStatisticsData(data: any, statisticsDataType: StatisticsDataType) {
    switch (statisticsDataType) {
      case StatisticsDataType.LatestUpdateTime: {
        this.latestUpdateTimeDataUpdated.next(data[0].date);
        break;
      }
      case StatisticsDataType.DailyStatistics: {
        this.dailyStatisticsDataUpdated.next(data[0]);
        break;
      }
      case StatisticsDataType.RespiratoryOverall:
      case StatisticsDataType.DeathsOverall:
      case StatisticsDataType.TestsOverall: {
        const dailyChangeTrendData = new Array<DailyChangeTrendData>();
        data.forEach((el) => {
          let obj = { date: null, amount: null };
          for (const prop of Object.keys(el)) {
            if (prop === '_id') continue;
            else if (prop === 'date') obj.date = el[prop] as Date;
            else obj.amount = el[prop] as number;
          }
          dailyChangeTrendData.push(obj);
        });
        this.dailyChangeTrendDataUpdated.next(dailyChangeTrendData);
        break;
      }
      case StatisticsDataType.IdentifiedChangeTrend: {
        this.identifiedChangeTrendDataUpdated.next(data);
        break;
      }
      case StatisticsDataType.SickSerious: {
        this.sickSeriousDataUpdated.next(data);
        break;
      }
      case StatisticsDataType.IdentifiedOutsideSpreadness: {
        this.identifiedOutsideSpreadnessDataUpdated.next(data);
        break;
      }
      case StatisticsDataType.RespiratoryAndSickSerious: {
        this.respiratoryAndSickSeriousData = data;
        this.respiratoryAndSickSeriousDataUpdated.next(data);
        break;
      }
      case StatisticsDataType.EpidemicCurve: {
        this.epidemicCurveData = data;
        this.epidemicCurveDataUpdated.next(this.epidemicCurveData);
        break;
      }
      case StatisticsDataType.WeeklyTests: {
        this.weeklyTestsDataUpdated.next(data);
        break;
      }
    }
  }

  getRespiratoryAndSickSeriousData(): Array<RespiratoryAndSickSerious> {
    return this.respiratoryAndSickSeriousData;
  }

  getEpidemicCurveData(): Array<EpidemicCurve> {
    return this.epidemicCurveData;
  }
}
