import { GlobalVariableStorageService } from './../../shared/services/globalVariablesStorage.service';
import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { IdentifiedChangeTrend } from './../../shared/models/statisticsDataModels/identifiedChangeTrend.model';
import { StatisticsService } from './../../shared/services/statistics.service';
import { ConnectionService } from './../../shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { getChangeTrendChartConfigObjFactory } from 'src/app/shared/highChart configuration object factories/changeTrendChartConfigObjFactory';

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
  private statData: Array<IdentifiedChangeTrend>;
  private chartConfigDataObj: ChartConfigObjData;

  chartContainerId = 'identifiedSpreadnessChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService,
    private globalVariableStorageService: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.statisticsService.identifiedChangeTrendDataUpdated.subscribe(
      (data) => {
        this.statData = data;
        this.drawChart();
      }
    );

    this.globalVariableStorageService.accesibleViewModeChanged.subscribe(
      (value) => {
        if (this.chartConfigDataObj)
          this.chartConfigDataObj.isOnAccessibleViewMode = value;

        this.drawChart();
      }
    );

    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  private drawChart(): void {
    const chartConfigData =
      this.chartConfigDataObj ?? this.createChartDataObject();

    Highcharts.chart(
      this.chartContainerId,
      getChangeTrendChartConfigObjFactory(chartConfigData)
    );
  }

  private createChartDataObject(): ChartConfigObjData {
    const data = this.statData;
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

    this.chartConfigDataObj = {
      xAxisTitle,
      xAxisCategories,
      yAxisTitle,
      yAxisData,
      tooltipTitle,
      isOnAccessibleViewMode: this.globalVariableStorageService.getIsOnAccessibleViewMode(),
    };

    return this.chartConfigDataObj;
  }

  private getSickDoubled(sickActive: number, identified: number): number {
    return +((sickActive * 2) / identified).toFixed(0);
  }

  // dummy data
  private getIdentifiedAverageChange(): number {
    return Math.floor(Math.random() * 6) + 2;
  }
}
