import { Component, OnInit } from '@angular/core';
import { getSickSeriousAreasplineConfigObject } from 'src/app/shared/highChart configuration object factories/sickSeriousAreasplineConfig';
import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { SickSerious } from 'src/app/shared/models/statisticsDataModels/sickSerious.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { ConnectionService } from 'src/app/shared/services/connection.service';
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
  private sickSeriousData: Array<SickSerious>;

  containerId = 'seriousCriticalSickChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.statisticsService.sickSeriousDataUpdated.subscribe((data) => {
      this.sickSeriousData = data;
      this.drawChart();
    });
    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  private drawChart(): void {
    const chartData = this.createChartDataObject();
    Highcharts.chart(
      this.containerId,
      getSickSeriousAreasplineConfigObject(chartData)
    );
  }

  private createChartDataObject(): AreasplineChartData {
    const xAxisTitle = null;
    const yAxisTitle = null;
    const tooltipTitle = null;
    let xAxisCategories = new Array<string>();
    let yAxisData = new Array<number>();

    for (let i = this.sickSeriousData.length - 1; i > -1; i--) {
      xAxisCategories.push(
        `${this.sickSeriousData[i].date.getDate()}.${
          this.sickSeriousData[i].date.getMonth() + 1
        }`
      );
      yAxisData.push(this.sickSeriousData[i].sickSerious);
    }

    return {
      xAxisTitle,
      yAxisTitle,
      tooltipTitle,
      xAxisCategories,
      yAxisData,
    };
  }
}
