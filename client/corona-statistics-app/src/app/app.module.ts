import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HebrewDateFormatPipe } from './shared/pipes/hebrewDateFormat.pipe';
import { DailyStatisticsComponent } from './daily-statistics/daily-statistics.component';
import { PercentageValuePipe } from './shared/pipes/percentageValue.pipe';
import { PlusMinusSignPipe } from './shared/pipes/plusMinusSign.pipe';
import { CommaPipe } from './shared/pipes/comma.pipe';
import { AreasplineChartComponent } from './daily-statistics/areaspline-chart/areaspline-chart.component';
import { PlainAreasplineChartComponent } from './spreadness indices components/plain-areaspline-chart/plain-areaspline-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HebrewDateFormatPipe,
    PercentageValuePipe,
    PlusMinusSignPipe,
    CommaPipe,
    DailyStatisticsComponent,
    AreasplineChartComponent,
    PlainAreasplineChartComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: 'API_CONNECTION_STRING',
      useValue: 'http://localhost:8080',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
