import { PlusMinusSignPipe } from './plusMinusSign.pipe';
import { PercentageValuePipe } from './percentageValue.pipe';
import { LocaleDateFormatPipe } from './localeDateFormat.pipe';
import { HebrewDateFormatPipe } from './hebrewDateFormat.pipe';
import { CommaPipe } from './comma.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CommaPipe,
    HebrewDateFormatPipe,
    LocaleDateFormatPipe,
    PercentageValuePipe,
    PlusMinusSignPipe,
  ],
  exports: [
    CommaPipe,
    HebrewDateFormatPipe,
    LocaleDateFormatPipe,
    PercentageValuePipe,
    PlusMinusSignPipe,
  ],
})
export class PipesModule {}
