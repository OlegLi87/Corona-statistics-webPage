import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { DropDownListItem } from './../../shared/models/dropDownListItem.model';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { drawArrow } from 'src/app/shared/svgUtils';
import {
  getDropDownListItems,
  getFormattedDateString,
} from 'src/app/shared/utils';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { RespiratoryAndSickSerious } from 'src/app/shared/models/statisticsDataModels/respiratoryAndSickSerious.model';
import { getRespiratoryAndSickSeriousConfigObject } from 'src/app/shared/highChart configuration object factories/respiratoryAndSickSeriousConfigFactory';

declare const Highcharts: any;

@Component({
  selector: 'app-respiratory-sick-serious',
  templateUrl: './respiratory-sick-serious.component.html',
  styleUrls: ['./respiratory-sick-serious.component.css'],
})
export class RespiratorySickSeriousComponent implements OnInit, AfterViewInit {
  dropDownListItems: Array<DropDownListItem>;
  overallRespiratory: number;
  overSickSerious: number;
  dropDownButtonText: string;
  showDropDownList = false;
  chartContainerId = 'respiratoryAndSickSerious';

  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.RespiratoryAndSickSerious,
    projectionQuery: 'date=1&respiratory=1&sickSerious=1',
    limit: 31,
  };
  private chartStatData: Array<RespiratoryAndSickSerious>;

  @HostListener('document:click', ['$event'])
  onClick() {
    this.showDropDownList = false;
  }

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.connectionService
      .fetchFieldSum('respiratory')
      .subscribe((data) => (this.overallRespiratory = data.overallSum));

    const sickSerSumObs = this.connectionService
      .fetchFieldSum('sickSerious')
      .subscribe((data) => (this.overSickSerious = data.overallSum));

    this.statisticsService.respiratoryAndSickSeriousDataUpdated.subscribe(
      (data) => {
        this.chartStatData = data;
        this.drawChart();
      }
    );

    this.dropDownListItems = getDropDownListItems();
    this.changeSelectedItem('חודש אחרון');
  }

  ngAfterViewInit(): void {
    drawArrow('.arrow.respiratory');
  }

  toggleShowDropDownList(event: MouseEvent): void {
    event.stopPropagation();
    this.showDropDownList = !this.showDropDownList;
  }

  changeSelectedItem(textValue: string): void {
    this.dropDownButtonText = textValue;

    this.dropDownListItems.forEach((li) => {
      if (li.textValue === textValue) {
        li.selected = true;
        this.connectionConfig.limit = li.amountToFetch;
      } else li.selected = false;
    });

    // each time user makes a new selection component must update it's chart statistic data state.
    this.updateChartData();
  }

  private updateChartData(): void {
    // in case component somehow will update itself it will check data against those saved within statistics service.
    const savedChartStatData =
      this.statisticsService.getRespiratoryAndSickSeriousData() ?? [];
    const limit = this.connectionConfig.limit;

    if (
      limit > savedChartStatData.length ||
      (!limit && savedChartStatData.length < 31)
    ) {
      this.connectionService.fetchStatisticsData(this.connectionConfig);
    } else {
      if (!limit) this.chartStatData = savedChartStatData;
      else this.chartStatData = savedChartStatData.slice(0, limit);
      this.drawChart();
    }
  }

  private drawChart(): void {
    const chartData = this.createChartDataObject();
    Highcharts.chart(
      this.chartContainerId,
      getRespiratoryAndSickSeriousConfigObject(chartData)
    );
  }

  private createChartDataObject(): AreasplineChartData {
    const xAxisTitle = 'תאריך';
    const yAxisTitle = 'מספר מקרים';
    const tooltipTitle = ['חולים קשה', 'מונשמים'];
    const xAxisCategories = new Array<string>();
    const yAxisData = new Array<Array<number>>();
    for (let i = 0; i++ < 2; ) yAxisData.push(new Array<number>());

    for (let i = this.chartStatData.length - 1; i > -1; i--) {
      xAxisCategories.push(getFormattedDateString(this.chartStatData[i].date));
      yAxisData[0].push(this.chartStatData[i].sickSerious);
      yAxisData[1].push(this.chartStatData[i].respiratory);
    }

    return {
      xAxisTitle,
      xAxisCategories,
      yAxisTitle,
      yAxisData,
      tooltipTitle,
    };
  }
}
