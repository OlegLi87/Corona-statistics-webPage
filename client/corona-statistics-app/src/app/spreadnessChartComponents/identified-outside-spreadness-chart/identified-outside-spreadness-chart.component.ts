import { Component, OnInit } from '@angular/core';
import { ConnectionConfig } from 'src/app/shared/models/connectionConfig.model';
import { StatisticsDataType } from 'src/app/shared/models/statisticsDataType';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';

@Component({
  selector: 'app-identified-outside-spreadness-chart',
  templateUrl: './identified-outside-spreadness-chart.component.html',
  styleUrls: ['./identified-outside-spreadness-chart.component.css'],
})
export class IdentifiedOutsideSpreadnessChartComponent implements OnInit {
  private connectionConfig: ConnectionConfig = {
    statisticsDataType: StatisticsDataType.IdentifiedOutsideSpreadness,
    projectionQuery: 'date=1&identifiedOutsideSpreadness=1',
    limit: 7,
  };

  containerId = 'outsideSpreadnessChart';

  constructor(
    private statisticsService: StatisticsService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {}
}
