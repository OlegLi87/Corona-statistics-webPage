import { environment } from './../../../environments/environment';
import { CityBasedStatData } from './../../fourthRowComponents/traffic-light-program/traffic-light-program.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { map } from 'rxjs/operators';
import { ConnectionConfig } from '../models/connectionConfig.model';
import { Observable } from 'rxjs';
import { errorHandler } from '../utils';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  private apiURL: string;

  constructor(
    private http: HttpClient,
    private statisticsService: StatisticsService
  ) {
    this.apiURL = environment.apiURL;
  }

  fetchStatisticsData(connectConfig: ConnectionConfig): void {
    const connectionString = this.buildConnectionString(
      connectConfig.projectionQuery,
      connectConfig.limit
    );

    this.http
      .get(connectionString)
      .pipe(map(this.modifyResponseData))
      .subscribe(
        (data) =>
          this.statisticsService.updateStatisticsData(
            data,
            connectConfig.statisticsDataType
          ),
        (error) => {
          errorHandler(error, connectConfig.statisticsDataType);
        }
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

  fetchCityBasedStatisticsData(): Observable<Array<CityBasedStatData>> {
    return this.http.get<Array<CityBasedStatData>>(
      this.apiURL + '/' + 'cityBasedStatistics'
    );
  }

  private buildConnectionString(
    projectionQuery: string,
    limit: number
  ): string {
    return `${this.apiURL}/dailyStatistics?${projectionQuery}&limit=${limit}`;
  }

  private buildConnectionStringForFieldSum(
    fieldName: string,
    limit: number
  ): string {
    let connectionString = `${this.apiURL}/dailyStatistics/fieldSum?field=${fieldName}`;
    return !limit ? connectionString : connectionString + `&limit=${limit}`;
  }

  private modifyResponseData(data: Array<any>): Array<any> {
    return data.map((d) => {
      return { ...d, date: new Date(d.date) };
    });
  }
}
