import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';
import { IdentifiedChangeTrend } from './../../shared/models/statisticsDataModels/identifiedChangeTrend.model';
import { StatisticsService } from './../../shared/services/statistics.service';
import { ConnectionService } from './../../shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { getIdentifiedChangeTrendAreasplineConfigObject } from 'src/app/shared/highChart configuration object factories/identifiedChangeTrendConfigFactory';

declare const Highcharts: any;

@Component({
  selector: 'app-identified-change-trend-chart',
  templateUrl: './identified-change-trend-chart.component.html',
  styleUrls: ['./identified-change-trend-chart.component.css'],
})
export class IdentifiedChangeTrendChartComponent implements OnInit {
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.IdentifiedChangeTrend,
    projectionQuery: 'date=1&identified=1&sickActive=1',
    limit: 7,
  };

  chartContainerId = 'identifiedSpreadnessChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.statisticsService.identifiedChangeTrendDataUpdated.subscribe(
      (data) => {
        this.drawChart(data);
      }
    );
    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  private drawChart(data: Array<IdentifiedChangeTrend>): void {
    const chartData = this.createChartDataObject(data);

    Highcharts.chart(
      this.chartContainerId,
      getIdentifiedChangeTrendAreasplineConfigObject(chartData)
    );
  }

  private createChartDataObject(
    data: Array<IdentifiedChangeTrend>
  ): AreasplineChartData {
    const xAxisTitle = null;
    const yAxisTitle = 'אחוז שינוי יומי';
    const tooltipTitle = null;
    const xAxisCategories = new Array<string>();
    const yAxisData = new Array<Array<number>>();
    yAxisData[0] = new Array<number>();
    yAxisData[1] = new Array<number>();

    for (let i = data.length - 1; i > -1; i--) {
      xAxisCategories.push(
        `${data[i].date.getDate()}.${data[i].date.getMonth() + 1}`
      );
      yAxisData[0].push(
        this.getSickDoubled(data[i].sickActive, data[i].identified)
      );
      yAxisData[1].push(this.getIdentifiedAverageChange());
    }

    return {
      xAxisTitle,
      xAxisCategories,
      yAxisTitle,
      yAxisData,
      tooltipTitle,
    };
  }

  private getSickDoubled(sickActive: number, identified: number): number {
    return +((sickActive * 2) / identified).toFixed(0);
  }

  // dummy data
  private getIdentifiedAverageChange(): number {
    return Math.floor(Math.random() * 6) + 2;
  }
}
