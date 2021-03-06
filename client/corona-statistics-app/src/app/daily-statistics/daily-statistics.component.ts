import { GlobalVariableStorageService } from './../shared/services/globalVariablesStorage.service';
import { DailyStatistics } from './../shared/models/statisticsDataModels/dailyStatistics.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ConnectionService } from '../shared/services/connection.service';
import { StatisticsService } from '../shared/services/statistics.service';
import { ConnectionConfig } from '../shared/models/connectionConfig.model';
import { StatisticsDataType } from '../shared/models/statisticsDataType';
import { errorHandler } from '../shared/utils';

declare const SVG: any;

interface togglingContent {
  container: HTMLDivElement;
  icon: HTMLDivElement;
  svgDraw: any;
}

@Component({
  selector: 'app-daily-statistics',
  templateUrl: './daily-statistics.component.html',
  styleUrls: ['./daily-statistics.component.css'],
})
export class DailyStatisticsComponent implements OnInit, AfterViewInit {
  @ViewChildren('buttonRespiratory,buttonDeaths,buttonTests')
  toggleButtons: QueryList<ElementRef<HTMLButtonElement>>;
  activeButton: HTMLButtonElement;
  activeInfoIcon: HTMLDivElement;
  identifiedOverall: number;
  deathsOverall: number;
  isOnAccessibleView = false;

  @HostListener('document:click', ['$event'])
  onClick() {
    this.activeButton = null;
    this.toggleChartOff();
  }

  private svgDraws = new Array<any>();
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.DailyStatistics,
    projectionQuery: 'recovered=0&identifiedOutsideSpreadness=0',
    limit: 1,
  };

  dailyStatistics: DailyStatistics;

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService,
    private globalVariableStorage: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.connectionService
      .fetchFieldSum('identified')
      .subscribe((data) => (this.identifiedOverall = data.overallSum));

    this.connectionService.fetchFieldSum('deaths').subscribe(
      (data) => {
        this.deathsOverall = data.overallSum;
      },
      (error) => {
        errorHandler(error, this.connectionConfig.statisticsDataType);
      }
    );

    this.statisticsService.dailyStatisticsDataUpdated.subscribe(
      (data) => (this.dailyStatistics = data)
    );

    this.globalVariableStorage.accesibleViewModeChanged.subscribe((value) => {
      this.isOnAccessibleView = value;
    });

    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  ngAfterViewInit(): void {
    this.createSvgGraphics();
  }

  buttonClicked(buttonElement: HTMLButtonElement, event: MouseEvent): void {
    event.stopPropagation();
    if (this.activeButton === buttonElement) this.activeButton = null;
    else this.activeButton = buttonElement;

    if (this.activeButton) this.toggleChartOn();
    this.toggleChartOff();
  }

  mouseEnter(infoTextContainer: HTMLDivElement): void {
    this.activeInfoIcon = infoTextContainer;
  }

  mouseLeave(): void {
    this.activeInfoIcon = null;
  }

  private toggleChartOn(): void {
    const togglingContent = this.getTogglingContent(this.activeButton);
    togglingContent.container.classList.add('active-container');
    togglingContent.icon.classList.add('active-icon');
    togglingContent.svgDraw.fire('toggleWhiteBarsOn');
  }

  private toggleChartOff(): void {
    for (let button of this.toggleButtons) {
      if (button.nativeElement !== this.activeButton) {
        const togglingContent = this.getTogglingContent(button.nativeElement);
        togglingContent.container.classList.remove('active-container');
        togglingContent.icon.classList.remove('active-icon');
        togglingContent.svgDraw.fire('toggleWhiteBarsOff');
      }
    }
  }

  private getTogglingContent(button: HTMLButtonElement): togglingContent {
    const container = button.parentElement as HTMLDivElement;
    const icon = button.firstChild as HTMLDivElement;
    let svgDraw;

    switch (icon.className.split(' ')[1]) {
      case 'first': {
        svgDraw = this.svgDraws[0];
        break;
      }
      case 'second': {
        svgDraw = this.svgDraws[1];
        break;
      }
      case 'third': {
        svgDraw = this.svgDraws[2];
        break;
      }
      default:
        svgDraw = null;
    }

    return { container, icon, svgDraw };
  }

  private createSvgGraphics(): void {
    const svgContainers = ['first', 'second', 'third'];
    svgContainers.forEach((c) => {
      const draw = SVG()
        .addTo(`.toggle-chart .bars-icon.${c}`)
        .size('100%', '100%');

      this.svgDraws.push(draw);

      const line1 = draw
        .line(4, 15, 4, 8)
        .stroke({ width: 2, color: '#596074' });
      const line2 = draw
        .line(9, 15, 9, 5)
        .stroke({ width: 2, color: '#596074' });
      const line3 = draw
        .line(14, 15, 14, 2)
        .stroke({ width: 2, color: '#596074' });

      const lines = [line1, line2, line3];

      draw.on('toggleWhiteBarsOn', () => {
        const lineColor = this.isOnAccessibleView ? '#596074' : '#fff';
        lines.forEach((l) => l.stroke({ color: lineColor }));
      });

      draw.on('toggleWhiteBarsOff', () => {
        const lineColor = this.isOnAccessibleView ? '#fff' : '#596074';
        lines.forEach((l) => l.stroke({ color: lineColor }));
      });
    });
  }

  getStatisticsDataType(statisticsType: string): StatisticsDataType {
    switch (statisticsType) {
      case 'respiratory':
        return StatisticsDataType.RespiratoryOverall;
      case 'deaths':
        return StatisticsDataType.DeathsOverall;
      case 'tests':
        return StatisticsDataType.TestsOverall;
    }
  }
}
