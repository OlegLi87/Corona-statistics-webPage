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
import { IdentifiedChangeTrendChartComponent } from './spreadnessChartComponents/identified-change-trend-chart/identified-change-trend-chart.component';
import { SeriousCriticalSickChartComponent } from './spreadnessChartComponents/serious-critical-sick-chart/serious-critical-sick-chart.component';
import { IdentifiedOutsideSpreadnessChartComponent } from './spreadnessChartComponents/identified-outside-spreadness-chart/identified-outside-spreadness-chart.component';
import { EpidemicalCurveComponent } from './thirdRowComponents/epidemical-curve/epidemical-curve.component';
import { RespiratorySickSeriousComponent } from './thirdRowComponents/respiratory-sick-serious/respiratory-sick-serious.component';

@NgModule({
  declarations: [
    AppComponent,
    HebrewDateFormatPipe,
    PercentageValuePipe,
    PlusMinusSignPipe,
    CommaPipe,
    DailyStatisticsComponent,
    AreasplineChartComponent,
    IdentifiedChangeTrendChartComponent,
    SeriousCriticalSickChartComponent,
    IdentifiedOutsideSpreadnessChartComponent,
    EpidemicalCurveComponent,
    RespiratorySickSeriousComponent,
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
