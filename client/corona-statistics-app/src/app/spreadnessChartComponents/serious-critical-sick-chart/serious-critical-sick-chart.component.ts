import { Component, OnInit } from '@angular/core';
import { getSickSeriousChartConfigObjFactory } from 'src/app/shared/highChart configuration object factories/sickSeriousChartConfigObjFactory';
import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { SickSerious } from 'src/app/shared/models/statisticsDataModels/sickSerious.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { GlobalVariableStorageService } from 'src/app/shared/services/globalVariablesStorage.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';

declare const Highcharts: any;

@Component({
  selector: 'app-serious-critical-sick-chart',
  templateUrl: './serious-critical-sick-chart.component.html',
  styleUrls: ['./serious-critical-sick-chart.component.css'],
})
export class SeriousCriticalSickChartComponent implements OnInit {
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.SickSerious,
    projectionQuery: 'date=1&sickSerious=1',
    limit: 7,
  };

  private statData: Array<SickSerious>;
  private chartConfigDataObj: ChartConfigObjData;

  chartContainerId = 'seriousCriticalSickChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService,
    private globalVariableStorageService: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.statisticsService.sickSeriousDataUpdated.subscribe((data) => {
      this.statData = data;
      this.drawChart();
    });

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
      getSickSeriousChartConfigObjFactory(chartConfigData)
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
      yAxisData[0].push(data[i].sickSerious);
    }

    this.chartConfigDataObj = {
      xAxisTitle,
      yAxisTitle,
      tooltipTitle,
      xAxisCategories,
      yAxisData,
      isOnAccessibleViewMode: this.globalVariableStorageService.getIsOnAccessibleViewMode(),
    };

    return this.chartConfigDataObj;
  }
}
