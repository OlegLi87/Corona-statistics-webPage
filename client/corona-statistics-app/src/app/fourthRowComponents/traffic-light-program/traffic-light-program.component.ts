import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { ConnectionService } from './../../shared/services/connection.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { errorHandler } from 'src/app/shared/utils';

interface ColumnHeader {
  name: string;
  sortingMultiplyer: number;
  sortingField: string;
}

export interface CityBasedStatData {
  city: string;
  grade: number;
  sickNew: number;
  positiveTests: number;
  identifiedChangeRate: number;
  sickActive: number;
}

@Component({
  selector: 'app-traffic-light-program',
  templateUrl: './traffic-light-program.component.html',
  styleUrls: ['./traffic-light-program.component.css'],
})
export class TrafficLightProgramComponent implements OnInit {
  latestTimeUpdated: Date;
  statData: Array<CityBasedStatData>;
  statDataToDisplay: Array<CityBasedStatData>;
  headerColumns = new Array<ColumnHeader>();
  latestClickedElement: HTMLElement;

  @HostListener('body:click', ['$event'])
  onclick(e: MouseEvent) {
    this.latestClickedElement = e.target as HTMLElement;
  }

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statisticsService.latestUpdateTimeDataUpdated.subscribe((data) => {
      this.latestTimeUpdated = data;
    });

    this.connectionService.fetchCityBasedStatisticsData().subscribe(
      (data) => {
        this.statData = data;
        this.statDataToDisplay = this.statData;
        this.populateHeaderColumns();
      },
      (error) => {
        errorHandler(error, StatisticsDataType.CityBasedStatistics);
      }
    );
  }

  getSquareColorClass(grade: number): string {
    if (grade < 4.5) return 'green';
    if (grade >= 4.5 && grade < 6) return 'yellow';
    if (grade >= 6 && grade < 7.5) return 'orange';
    return 'red';
  }

  isListDisplayed(input: HTMLInputElement): boolean {
    return (
      this.latestClickedElement === input &&
      input.value.length > 1 &&
      this.statDataToDisplay.length > 0
    );
  }

  changeSortingOrder(header: ColumnHeader): void {
    switch (header.sortingMultiplyer) {
      case 0: {
        header.sortingMultiplyer = -1;
        break;
      }
      case -1: {
        header.sortingMultiplyer = 1;
        break;
      }
      default:
        header.sortingMultiplyer = 0;
    }

    this.resetSortingOrderForOthers(header);
    this.sortTable(header);
  }

  setDataToDisplay(event: KeyboardEvent) {
    const text = (event.target as HTMLInputElement).value;
    if (text.length < 2) {
      this.statDataToDisplay = this.statData;
      return;
    }
    this.statDataToDisplay = this.statData.filter(
      (d) => d.city.indexOf(text) !== -1
    );
  }

  private resetSortingOrderForOthers(header: ColumnHeader): void {
    this.headerColumns.forEach((h) => {
      if (h !== header) h.sortingMultiplyer = 0;
    });
  }

  private sortTable(header: ColumnHeader): void {
    const mult = !header.sortingMultiplyer ? -1 : header.sortingMultiplyer;
    const sf = header.sortingField;

    // this way of sorting enables number a string values sorting
    this.statDataToDisplay.sort((a, b) => {
      let res;
      if (a[sf] > b[sf]) res = 1;
      else if (a[sf] < b[sf]) res = -1;
      else res = 0;
      return res * mult;
    });
  }

  private populateHeaderColumns(): void {
    const headerNames = [
      'ישוב',
      'ציון וצבע יומי',
      'חולים חדשים לכל 10,000 נפש *',
      '% הבדיקות החיוביות *',
      'שיעור שינוי מאומתים *',
      'חולים פעילים',
    ];
    const statDataKeys = [
      'city',
      'grade',
      'sickNew',
      'positiveTests',
      'identifiedChangeRate',
      'sickActive',
    ];

    for (let i = 0; i < headerNames.length; i++) {
      const name = headerNames[i];
      const sortingField = statDataKeys[i];
      const sortingMultiplyer = sortingField === 'grade' ? -1 : 0;
      this.headerColumns.push({ name, sortingMultiplyer, sortingField });
    }

    this.sortTable(this.headerColumns.find((h) => h.sortingField === 'grade'));
  }
}
