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
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.LatestUpdateTime,
    projectionQuery: 'date=1',
    limit: 1,
  };

  latestUpdateTime: Date;

  constructor(
    private connectionService: ConnectionService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statisticsService.latestUpdateTimeDataUpdated.subscribe((data) => {
      this.latestUpdateTime = data;
    });

    this.connectionService.fetchStatisticsData(this.connectionConfig);
  }

  showError(): boolean {
    return GlobalHttpInterceptorService.errorCounter > 6;
  }
}
