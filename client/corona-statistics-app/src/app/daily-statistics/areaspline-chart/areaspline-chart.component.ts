import { DailyChangeTrendData } from './../../shared/models/statisticsDataModels/dailyChangeTrendData.model';
import { StatisticsService } from './../../shared/services/statistics.service';
import { ConnectionService } from './../../shared/services/connection.service';
import { Component, Input, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { getDailyStatChartConfigObj } from '../../shared/highChart configuration object factories/dailyStatChartConfigObjFactory';
import { ChartConfigObjData } from '../../shared/models/chartConfigObjData.model';

declare const Highcharts: any;

@Component({
  selector: 'app-areaspline-chart',
  templateUrl: './areaspline-chart.component.html',
  styleUrls: ['./areaspline-chart.component.css'],
})
export class AreasplineChartComponent implements OnInit {
  @Input() statisticsDataType: StatisticsDataType;
  chartContainerID = 'daily-change-trend-arespline-chart';
  title: string;
  private connectionConfig: ConnectionConfig;
  private dailyChangeTrendData: Array<DailyChangeTrendData>;

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.initializeComponentState();
    this.statisticsService.dailyChangeTrendDataUpdated.subscribe((data) => {
      this.dailyChangeTrendData = data;
      this.drawChart();
    });
    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  private initializeComponentState() {
    switch (this.statisticsDataType) {
      case StatisticsDataType.RespiratoryOverall: {
        this.title = 'מונשמים - שינוי יומי';
        this.connectionConfig = {
          statisticsDataType: this.statisticsDataType,
          projectionQuery: 'date=1&respiratory=1',
          limit: null,
        };
        break;
      }
      case StatisticsDataType.DeathsOverall: {
        this.title = 'נפטרים - שינוי יומי';
        this.connectionConfig = {
          statisticsDataType: this.statisticsDataType,
          projectionQuery: 'date=1&deaths=1',
          limit: null,
        };
        break;
      }
      case StatisticsDataType.TestsOverall: {
        this.title = 'בדיקות - מגמת שינוי יומית';
        this.connectionConfig = {
          statisticsDataType: this.statisticsDataType,
          projectionQuery: 'date=1&tests=1',
          limit: null,
        };
      }
    }
  }

  private drawChart(): void {
    let chartData = this.createChartDataObject();
    Highcharts.chart(
      this.chartContainerID,
      getDailyStatChartConfigObj(chartData)
    );
  }

  private createChartDataObject(): ChartConfigObjData {
    const xAxisTitle = 'תאריך';
    let tooltipTitle = new Array<string>();
    let yAxisTitle: string;
    let yAxisData = new Array<Array<number>>();
    yAxisData[0] = new Array<number>();
    const xAxisCategories = new Array<string>();

    // reversing elements order since API sends data in descending date based order.
    for (let i = this.dailyChangeTrendData.length - 1; i > -1; i--) {
      const data = this.dailyChangeTrendData[i];
      xAxisCategories.push(
        data.date.getDate() + '.' + (data.date.getMonth() + 1)
      );
      yAxisData[0].push(data.amount);
    }

    switch (this.statisticsDataType) {
      case StatisticsDataType.RespiratoryOverall: {
        yAxisTitle = 'כמות מונשמים';
        tooltipTitle.push('מונשמים');
        break;
      }
      case StatisticsDataType.DeathsOverall: {
        yAxisTitle = 'כמות נפטרים';
        tooltipTitle.push('נפטרים');
        break;
      }
      case StatisticsDataType.TestsOverall: {
        yAxisTitle = 'מספר בדיקות יומיות';
        tooltipTitle.push('בדיקות');
        break;
      }
    }

    return {
      xAxisTitle,
      tooltipTitle,
      xAxisCategories,
      yAxisTitle,
      yAxisData,
    };
  }
}
