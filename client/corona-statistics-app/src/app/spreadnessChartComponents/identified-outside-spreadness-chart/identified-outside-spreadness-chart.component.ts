import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { IdentifiedOutsideSpreadness } from './../../shared/models/statisticsDataModels/identifiedOutsideSpreadness.model';
import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { getIdentifiedOutsideSpreadChartConfigObjFactory } from 'src/app/shared/highChart configuration object factories/identifiedOutsideSpreadChartConfigObjFactory';
import { GlobalVariableStorageService } from 'src/app/shared/services/globalVariablesStorage.service';

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

  private statData: Array<IdentifiedOutsideSpreadness>;
  private chartConfigDataObj: ChartConfigObjData;

  chartContainerId = 'outsideSpreadnessChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService,
    private globalVariableStorageService: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.statisticsService.identifiedOutsideSpreadnessDataUpdated.subscribe(
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
      getIdentifiedOutsideSpreadChartConfigObjFactory(chartConfigData)
    );
  }

  private createChartDataObject(): ChartConfigObjData {
    const data = this.statData;
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
    this.chartConfigDataObj = {
      xAxisTitle,
      xAxisCategories,
      yAxisData,
      yAxisTitle,
      tooltipTitle,
      isOnAccessibleViewMode: this.globalVariableStorageService.getIsOnAccessibleViewMode(),
    };

    return this.chartConfigDataObj;
  }
}
