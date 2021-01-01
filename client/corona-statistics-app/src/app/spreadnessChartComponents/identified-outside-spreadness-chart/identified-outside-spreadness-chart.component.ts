import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';
import { IdentifiedOutsideSpreadness } from './../../shared/models/statisticsDataModels/identifiedOutsideSpreadness.model';
import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { getIdentifiedOutsideSpreadnessColumnConfigObject } from 'src/app/shared/highChart configuration object factories/identifiedOutsideSpreadnessColumnConfigFactory';

declare const Highcharts: any;

@Component({
  selector: 'app-identified-outside-spreadness-chart',
  templateUrl: './identified-outside-spreadness-chart.component.html',
  styleUrls: ['./identified-outside-spreadness-chart.component.css'],
})
export class IdentifiedOutsideSpreadnessChartComponent implements OnInit {
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.IdentifiedOutsideSpreadness,
    projectionQuery: 'date=1&identifiedOutsideSpreadness=1',
    limit: 7,
  };

  chartContainerId = 'outsideSpreadnessChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.statisticsService.identifiedOutsideSpreadnessDataUpdated.subscribe(
      (data) => {
        this.drawChart(data);
      }
    );
    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  private drawChart(data: Array<IdentifiedOutsideSpreadness>): void {
    const chartData = this.createChartDataObject(data);
    Highcharts.chart(
      this.chartContainerId,
      getIdentifiedOutsideSpreadnessColumnConfigObject(chartData)
    );
  }

  private createChartDataObject(
    data: Array<IdentifiedOutsideSpreadness>
  ): AreasplineChartData {
    const xAxisTitle = null;
    const yAxisTitle = null;
    const tooltipTitle = null;
    let xAxisCategories = new Array<string>();
    let yAxisData = new Array<Array<number>>();
    yAxisData[0] = new Array<number>();

    for (let i = data.length - 1; i > -1; i--) {
      xAxisCategories.push(
        `${data[i].date.getDate()}.${data[i].date.getMonth() + 1}`
      );
      yAxisData[0].push(data[i].identifiedOutsideSpreadness);
    }
    return {
      xAxisTitle,
      xAxisCategories,
      yAxisData,
      yAxisTitle,
      tooltipTitle,
    };
  }
}
