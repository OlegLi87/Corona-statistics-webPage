import { DropDownListItem } from './models/dropDownListItem.model';

export function getDropDownListItems(): Array<DropDownListItem> {
  const textValues = [
    'עד עכשיו',
    ' שבוע אחרון',
    'שבועיים אחרונים',
    'חודש אחרון',
  ];
  const amountsToFetch = [null, 7, 14, 30];

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
