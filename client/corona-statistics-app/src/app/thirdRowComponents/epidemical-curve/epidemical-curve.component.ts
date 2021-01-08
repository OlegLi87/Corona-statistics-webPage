import { AreasplineChartData } from 'src/app/shared/models/areasplineChartData.model';
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
import { getEpidemicCurveConfigObject } from 'src/app/shared/highChart configuration object factories/epidemicCurveConfigFactory';

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
  private epidemicCurveData: Array<EpidemicCurve>;

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
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statisticsService.epidemicCurveDataUpdated.subscribe((data) => {
      this.epidemicCurveData = data;
      this.drawChart();
    });
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
      if (!limit) this.epidemicCurveData = savedData;
      else this.epidemicCurveData = savedData.slice(0, limit);
      this.drawChart();
    }
  }

  private drawChart(): void {
    const chartData = this.createChartDataObject();
    Highcharts.chart(
      this.chartContainerId,
      getEpidemicCurveConfigObject(chartData)
    );
  }

  private createChartDataObject(): AreasplineChartData {
    const xAxisTitle = 'תאריך בדיקה';
    const yAxisTitle = 'מספר מקרים מצטבר';
    const tooltipTitle = ['מאומתים מצטבר', 'מחלימים חדשים', 'מאומתים חדשים'];
    let xAxisCategories: Array<string> = [];
    let yAxisData: Array<Array<number>> = [];

    for (let i = 0; i < 3; i++) yAxisData.push([]);

    for (let i = this.epidemicCurveData.length - 1; i > -1; i--) {
      xAxisCategories.push(
        getFormattedDateString(this.epidemicCurveData[i].date)
      );
      yAxisData[0].push(this.epidemicCurveData[i]['identifiedOverall']);
      yAxisData[1].push(this.epidemicCurveData[i]['recovered']);
      yAxisData[2].push(this.epidemicCurveData[i]['identified']);
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
