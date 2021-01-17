import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { ConnectionService } from './../../shared/services/connection.service';
import { Component, HostListener, OnInit } from '@angular/core';

interface ColumnHeader {
  name: string;
  sortingMultiplyer: number;
  sortingField: string;
}

interface StatData {
  city: string;
  grade: number;
  newSick: number;
  positiveTests: number;
  identifiedChange: number;
  activeSick: number;
}

@Component({
  selector: 'app-traffic-light-program',
  templateUrl: './traffic-light-program.component.html',
  styleUrls: ['./traffic-light-program.component.css'],
})
export class TrafficLightProgramComponent implements OnInit {
  latestTimeUpdated: Date;
  statData = new Array<StatData>();
  statDataToDisplay = new Array<StatData>();
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
    this.createDummyData();
    this.statDataToDisplay = this.statData;
    this.populateHeaderColumns();
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
    const statDataKeys = Object.keys(this.statData[0]);

    for (let i = 0; i < headerNames.length; i++) {
      const name = headerNames[i];
      const sortingField = statDataKeys[i];
      const sortingMultiplyer = sortingField === 'grade' ? -1 : 0;
      this.headerColumns.push({ name, sortingMultiplyer, sortingField });
    }

    this.sortTable(this.headerColumns.find((h) => h.sortingField === 'grade'));
  }

  private createDummyData(): void {
    for (let i = 0; i < 100; i++) {
      const city = this.getRandomWord(this.getRandomNumber(4, 11));
      const grade = this.getRandomNumber(3, 10);
      const newSick = this.getRandomNumber(10, 350);
      const positiveTests = this.getRandomNumber(8, 60);
      const identifiedChange = this.getRandomNumber(5, 70);
      const activeSick = this.getRandomNumber(50, 2500);
      this.statData.push({
        city,
        grade,
        newSick,
        positiveTests,
        identifiedChange,
        activeSick,
      });
    }
  }

  private getRandomNumber(from: number, to: number): number {
    return from + Math.floor(Math.random() * (to + 1 - from));
  }

  private getRandomWord(numOfLetters): string {
    const arr = [];
    for (let i = 0; i < numOfLetters; i++) {
      arr.push(this.getRandomNumber(1488, 1514));
    }
    return String.fromCharCode(...arr);
  }
}
