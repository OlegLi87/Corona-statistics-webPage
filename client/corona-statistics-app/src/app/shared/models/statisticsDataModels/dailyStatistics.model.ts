export interface DailyStatistics {
  date: Date;
  identified: number;
  identifiedFromMidnight: number;
  identifiedOverall: number;
  respiratory: number;
  respiratoryFromMidnight: number;
  sickActive: number;
  sickActiveFromMidnight: number;
  sickActiveAtHome: number;
  sickActiveAtHospital: number;
  sickActiveAtHotel: number;
  sickSerious: number;
  sickSeriousFromMidnight: number;
  sickModerate: number;
  sickCritical: number;
  deaths: number;
  deathsOverall: number;
  tests: number;
}
