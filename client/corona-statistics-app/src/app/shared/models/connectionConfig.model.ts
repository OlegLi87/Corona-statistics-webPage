import { StatisticsDataType } from './statisticsDataType';

export interface ConnectionConfig {
  statisticsDataType: StatisticsDataType;
  projectionQuery: string;
  limit: number;
}
