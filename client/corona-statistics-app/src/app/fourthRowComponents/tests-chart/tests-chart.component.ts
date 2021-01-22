import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { WeeklyTests } from './../../shared/models/statisticsDataModels/weeklyTests.model';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { getFormattedDateString } from 'src/app/shared/utils';
import { getWeeklyTestsChartConfigObjFactory } from 'src/app/shared/highChart configuration object factories/weeklyTestsChartConfigObjFactory';
import { GlobalVariableStorageService } from 'src/app/shared/services/globalVariablesStorage.service';

declare const Highcharts: any;

@Component({
  selector: 'app-tests-chart',
  templateUrl: './tests-chart.component.html',
  styleUrls: ['./tests-chart.component.css'],
})
export class TestsChartComponent implements OnInit {
  chartContainerId = 'testsChart';
  lastWeekTest: number;
  weeklyIdentified: string;

  private statData: Array<WeeklyTests>;
  private chartConfigDataObj: ChartConfigObjData;

  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.WeeklyTests,
    projectionQuery: 'date=1&identified=1&tests=1',
    limit: 7,
  };

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService,
    private globalVariableStorageService: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.fetchInfoRowData();
    this.statisticsService.weeklyTestsDataUpdated.subscribe((data) => {
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

  private fetchInfoRowData(): void {
    this.connectionService.fetchFieldSum('tests', 7).subscribe((data) => {
      this.lastWeekTest = data.overallSum;
      this.connectionService
        .fetchFieldSum('identified', 7)
        .subscribe((data) => {
          this.weeklyIdentified = (
            (data.overallSum / this.lastWeekTest) *
            100
          ).toFixed(2);
        });
    });
  }

  private drawChart(): void {
    const chartConfigData =
      this.chartConfigDataObj ?? this.createChartDataObj();

    Highcharts.chart(
      this.chartContainerId,
      getWeeklyTestsChartConfigObjFactory(chartConfigData)
    );
  }

  private createChartDataObj(): ChartConfigObjData {
    const xAxisTitle = 'תאריך בדיקה';
    const yAxisTitle = 'מספר בדיקות';
    const tooltipTitle = ['בדיקות', 'מאומתים'];
    const xAxisCategories = new Array<string>();
    const yAxisData = [new Array<number>(), new Array<number>()];

    for (let i = this.statData.length - 1; i > -1; i--) {
      xAxisCategories.push(getFormattedDateString(this.statData[i].date));
      yAxisData[0].push(this.statData[i].tests);
      yAxisData[1].push(this.statData[i].identified);
    }

    this.chartConfigDataObj = {
      xAxisTitle,
      yAxisTitle,
      xAxisCategories,
      yAxisData,
      tooltipTitle,
      isOnAccessibleViewMode: this.globalVariableStorageService.getIsOnAccessibleViewMode(),
    };

    return this.chartConfigDataObj;
  }
}
