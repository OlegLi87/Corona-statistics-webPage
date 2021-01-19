import { StatisticsDataType } from './models/statisticsDataType';
import { HttpErrorResponse } from '@angular/common/http';
import { DropDownListItem } from './models/dropDownListItem.model';

export function getDropDownListItems(): Array<DropDownListItem> {
  const textValues = [
    'עד עכשיו',
    ' שבוע אחרון',
    'שבועיים אחרונים',
    'חודש אחרון',
  ];
  const amountsToFetch = [null, 7, 14, 31];

  const dropDownListItems: DropDownListItem[] = [];

  textValues.forEach((v, i) => {
    dropDownListItems.push({
      textValue: v,
      amountToFetch: amountsToFetch[i],
      selected: false,
    });
  });

  return dropDownListItems;
}

export function getFormattedDateString(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}`;
}

export function errorHandler(
  error: HttpErrorResponse,
  statisticsDataType: StatisticsDataType
): void {
  console.log(
    `Couldnt fetch a data for ${StatisticsDataType[statisticsDataType]}. \nstatus : ${error.status},status message : ${error.statusText}`
  );
}
