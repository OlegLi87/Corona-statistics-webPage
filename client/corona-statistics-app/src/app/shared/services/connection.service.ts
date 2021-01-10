import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { map } from 'rxjs/operators';
import { ConnectionConfig } from '../models/connectionConfig.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  constructor(
    private http: HttpClient,
    private statisticsService: StatisticsService,
    @Inject('API_CONNECTION_STRING') private connectionString: string
  ) {}

  fetchStatisticsData(connectConfig: ConnectionConfig): void {
    const connectionString = this.buildConnectionString(
      connectConfig.projectionQuery,
      connectConfig.limit
    );

    this.http
      .get(connectionString)
      .pipe(map(this.modifyResponseData))
      .subscribe((data) =>
        this.statisticsService.updateStatisticsData(
          data,
          connectConfig.statisticsDataType
        )
      );
  }

  fetchFieldSum(
    fieldName: string,
    limit: number = undefined
  ): Observable<{ overallSum: number }> {
    const connectionString = this.buildConnectionStringForFieldSum(
      fieldName,
      limit
    );
    return this.http.get<{ overallSum: number }>(connectionString);
  }

  private buildConnectionString(
    projectionQuery: string,
    limit: number
  ): string {
    return `${this.connectionString}/dailyStatistics?${projectionQuery}&limit=${limit}`;
  }

  private buildConnectionStringForFieldSum(
    fieldName: string,
    limit: number
  ): string {
    let connectionString = `${this.connectionString}/dailyStatistics/fieldSum?field=${fieldName}`;
    return !limit ? connectionString : connectionString + `&limit=${limit}`;
  }

  private modifyResponseData(data: Array<any>): Array<any> {
    return data.map((d) => {
      return { ...d, date: new Date(d.date) };
    });
  }
}
