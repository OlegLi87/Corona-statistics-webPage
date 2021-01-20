import { GlobalHttpInterceptorService } from './shared/services/globalHttpInterceptor.service';
import { PipesModule } from './shared/pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DailyStatisticsComponent } from './daily-statistics/daily-statistics.component';
import { AreasplineChartComponent } from './daily-statistics/areaspline-chart/areaspline-chart.component';
import { IdentifiedChangeTrendChartComponent } from './spreadnessChartComponents/identified-change-trend-chart/identified-change-trend-chart.component';
import { SeriousCriticalSickChartComponent } from './spreadnessChartComponents/serious-critical-sick-chart/serious-critical-sick-chart.component';
import { IdentifiedOutsideSpreadnessChartComponent } from './spreadnessChartComponents/identified-outside-spreadness-chart/identified-outside-spreadness-chart.component';
import { EpidemicalCurveComponent } from './thirdRowComponents/epidemical-curve/epidemical-curve.component';
import { RespiratorySickSeriousComponent } from './thirdRowComponents/respiratory-sick-serious/respiratory-sick-serious.component';
import { TrafficLightProgramComponent } from './fourthRowComponents/traffic-light-program/traffic-light-program.component';
import { TestsChartComponent } from './fourthRowComponents/tests-chart/tests-chart.component';
import { HttpErrorComponent } from './http-error/http-error.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyStatisticsComponent,
    AreasplineChartComponent,
    IdentifiedChangeTrendChartComponent,
    SeriousCriticalSickChartComponent,
    IdentifiedOutsideSpreadnessChartComponent,
    EpidemicalCurveComponent,
    RespiratorySickSeriousComponent,
    TrafficLightProgramComponent,
    TestsChartComponent,
    HttpErrorComponent,
  ],
  imports: [BrowserModule, HttpClientModule, PipesModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
