import { StatisticsService } from './../../shared/services/statistics.service';
import { ConnectionService } from './../../shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';

@Component({
  selector: 'app-identified-change-trend-chart',
  templateUrl: './identified-change-trend-chart.component.html',
  styleUrls: ['./identified-change-trend-chart.component.css'],
})
export class IdentifiedChangeTrendChartComponent implements OnInit {
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.IdentifiedChangeTrend,
    projectionQuery: 'date=1&identified=1&identifiedOverall=1&sickActive=1',
    limit: 7,
  };

  containerId = 'identifiedSpreadnessChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {}
}
