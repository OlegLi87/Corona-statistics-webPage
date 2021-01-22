import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { DropDownListItem } from './../../shared/models/dropDownListItem.model';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { drawArrow } from 'src/app/shared/svgUtils';
import {
  errorHandler,
  getDropDownListItems,
  getFormattedDateString,
} from 'src/app/shared/utils';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { RespiratoryAndSickSerious } from 'src/app/shared/models/statisticsDataModels/respiratoryAndSickSerious.model';
import { getRespiratorySickChartConfigObjFactory } from 'src/app/shared/highChart configuration object factories/respiratorySickChartConfigObjFactory';
import { GlobalVariableStorageService } from 'src/app/shared/services/globalVariablesStorage.service';

declare const Highcharts: any;

@Component({
  selector: 'app-respiratory-sick-serious',
  templateUrl: './respiratory-sick-serious.component.html',
  styleUrls: ['./respiratory-sick-serious.component.css'],
})
export class RespiratorySickSeriousComponent implements OnInit, AfterViewInit {
  dropDownListItems: Array<DropDownListItem>;
  overallRespiratory: number;
  overallSickSerious: number;
  dropDownButtonText: string;
  showDropDownList = false;
  chartContainerId = 'respiratoryAndSickSerious';

  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.RespiratoryAndSickSerious,
    projectionQuery: 'date=1&respiratory=1&sickSerious=1',
    limit: 31,
  };
  private statData: Array<RespiratoryAndSickSerious>;
  private chartConfigDataObj: ChartConfigObjData;

  @HostListener('document:click', ['$event'])
  onClick() {
    this.showDropDownList = false;
  }

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService,
    private globalVariableStorageService: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.connectionService.fetchFieldSum('respiratory').subscribe(
      (data) => (this.overallRespiratory = data.overallSum),
      (error) => {
        errorHandler(error, this.connectionConfig.statisticsDataType);
      }
    );

    const sickSerSumObs = this.connectionService
      .fetchFieldSum('sickSerious')
      .subscribe(
        (data) => (this.overallSickSerious = data.overallSum),
        (error) => {
          errorHandler(error, this.connectionConfig.statisticsDataType);
        }
      );

    this.statisticsService.respiratoryAndSickSeriousDataUpdated.subscribe(
      (data) => {
        this.statData = data;
        this.drawChart(false);
      }
    );

    this.globalVariableStorageService.accesibleViewModeChanged.subscribe(
      (value) => {
        if (this.chartConfigDataObj)
          this.chartConfigDataObj.isOnAccessibleViewMode = value;

        this.drawChart(true);
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
      if (!limit) this.statData = savedChartStatData;
      else this.statData = savedChartStatData.slice(0, limit);
      this.drawChart(false);
    }
  }

  private drawChart(isAfterThemeChanged: boolean): void {
    const chartConfigData =
      (isAfterThemeChanged && this.chartConfigDataObj) ||
      this.createChartDataObject();

    Highcharts.chart(
      this.chartContainerId,
      getRespiratorySickChartConfigObjFactory(chartConfigData)
    );
  }

  private createChartDataObject(): ChartConfigObjData {
    const xAxisTitle = 'תאריך';
    const yAxisTitle = 'מספר מקרים';
    const tooltipTitle = ['חולים קשה', 'מונשמים'];
    const xAxisCategories = new Array<string>();
    const yAxisData = new Array<Array<number>>();
    for (let i = 0; i++ < 2; ) yAxisData.push(new Array<number>());

    for (let i = this.statData.length - 1; i > -1; i--) {
      xAxisCategories.push(getFormattedDateString(this.statData[i].date));
      yAxisData[0].push(this.statData[i].sickSerious);
      yAxisData[1].push(this.statData[i].respiratory);
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
}
