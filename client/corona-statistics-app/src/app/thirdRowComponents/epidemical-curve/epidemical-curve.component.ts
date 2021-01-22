import { ChartConfigObjData } from 'src/app/shared/models/chartConfigObjData.model';
import { StatisticsService } from './../../shared/services/statistics.service';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { DropDownListItem } from './../../shared/models/dropDownListItem.model';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { drawArrow } from 'src/app/shared/svgUtils';
import {
  getDropDownListItems,
  getFormattedDateString,
} from 'src/app/shared/utils';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { EpidemicCurve } from 'src/app/shared/models/statisticsDataModels/epidemicCurve.model';
import { getEpidemicCurveChartConfigObjFactory } from 'src/app/shared/highChart configuration object factories/epidemicCurveChartConfigObjFactory';
import { GlobalVariableStorageService } from 'src/app/shared/services/globalVariablesStorage.service';

declare const Highcharts: any;

@Component({
  selector: 'app-epidemical-curve',
  templateUrl: './epidemical-curve.component.html',
  styleUrls: ['./epidemical-curve.component.css'],
})
export class EpidemicalCurveComponent implements OnInit, AfterViewInit {
  dropDownButtonText: string;
  dropDownListItems: Array<DropDownListItem>;
  showDropDownList = false;
  chartContainerId = 'epidemicCurve';
  private statData: Array<EpidemicCurve>;
  private chartConfigDataObj: ChartConfigObjData;

  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.EpidemicCurve,
    projectionQuery: 'date=1&identified=1&recovered=1&identifiedOverall=1',
    limit: undefined,
  };

  @HostListener('document:click')
  onclick() {
    this.showDropDownList = false;
  }

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService,
    private globalVariableStorageService: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.statisticsService.epidemicCurveDataUpdated.subscribe((data) => {
      this.statData = data;
      this.drawChart(false);
    });

    this.globalVariableStorageService.accesibleViewModeChanged.subscribe(
      (value) => {
        if (this.chartConfigDataObj)
          this.chartConfigDataObj.isOnAccessibleViewMode = value;

        this.drawChart(true);
      }
    );

    this.dropDownListItems = getDropDownListItems();
    this.changeSelectedItem('שבועיים אחרונים');
  }

  ngAfterViewInit(): void {
    drawArrow('.arrow.epidemicalCurve');
  }

  toggleShowDropDownList(event: MouseEvent) {
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

    this.updateChartData();
  }

  private updateChartData(): void {
    const savedData = this.statisticsService.getEpidemicCurveData() ?? [];
    const limit = this.connectionConfig.limit;

    if (limit > savedData.length || (!limit && savedData.length < 32)) {
      this.connectionService.fetchStatisticsData(this.connectionConfig);
    } else {
      if (!limit) this.statData = savedData;
      else this.statData = savedData.slice(0, limit);
      this.drawChart(false);
    }
  }

  private drawChart(isAfterThemeChanged: boolean): void {
    const chartConfigData =
      (isAfterThemeChanged && this.chartConfigDataObj) ||
      this.createChartDataObject();

    Highcharts.chart(
      this.chartContainerId,
      getEpidemicCurveChartConfigObjFactory(chartConfigData)
    );
  }

  private createChartDataObject(): ChartConfigObjData {
    const xAxisTitle = 'תאריך בדיקה';
    const yAxisTitle = 'מספר מקרים מצטבר';
    const tooltipTitle = ['מאומתים מצטבר', 'מחלימים חדשים', 'מאומתים חדשים'];
    let xAxisCategories: Array<string> = [];
    let yAxisData: Array<Array<number>> = [];

    for (let i = 0; i < 3; i++) yAxisData.push([]);

    for (let i = this.statData.length - 1; i > -1; i--) {
      xAxisCategories.push(getFormattedDateString(this.statData[i].date));
      yAxisData[0].push(this.statData[i]['identifiedOverall']);
      yAxisData[1].push(this.statData[i]['recovered']);
      yAxisData[2].push(this.statData[i]['identified']);
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
