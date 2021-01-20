import { GlobalVariableStorageService } from './shared/services/globalVariablesStorage.service';
import { GlobalHttpInterceptorService } from './shared/services/globalHttpInterceptor.service';
import { StatisticsService } from './shared/services/statistics.service';
import { ConnectionService } from './shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { StatisticsDataType } from './shared/models/statisticsDataType';
import { ConnectionConfig } from './shared/models/connectionConfig.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [Symbol.toStringTag] = 'AppComponent'; // used for type verification within GlobalVariableStorage service.

  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.LatestUpdateTime,
    projectionQuery: 'date=1',
    limit: 1,
  };

  isOnAccessibleView = false;
  latestUpdateTime: Date;

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService,
    private globalVariablesStorage: GlobalVariableStorageService
  ) {}

  ngOnInit(): void {
    this.statisticsService.latestUpdateTimeDataUpdated.subscribe((data) => {
      this.latestUpdateTime = data;
    });

    this.connectionService.fetchStatisticsData(this.connectionConfig);

    this.globalVariablesStorage.accesibleViewModeChanged.subscribe((value) => {
      this.isOnAccessibleView = value;
    });
  }

  accesibleViewClicked(): void {
    this.globalVariablesStorage.toggleAccesibleViewMode(this);
  }

  getViewButtonText(): string {
    return this.isOnAccessibleView ? 'לתצוגה רגילה' : 'לתצוגה נגישה';
  }

  showError(): boolean {
    return GlobalHttpInterceptorService.errorCounter > 6;
  }
}
