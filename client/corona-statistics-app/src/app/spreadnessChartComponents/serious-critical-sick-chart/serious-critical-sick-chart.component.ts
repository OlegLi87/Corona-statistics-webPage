import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';

@Component({
  selector: 'app-serious-critical-sick-chart',
  templateUrl: './serious-critical-sick-chart.component.html',
  styleUrls: ['./serious-critical-sick-chart.component.css'],
})
export class SeriousCriticalSickChartComponent implements OnInit {
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.SickSerious,
    projectionQuery: 'date=1&sickSerious=1',
    limit: 7,
  };

  containerId = 'seriousCriticalSickChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {}
}
