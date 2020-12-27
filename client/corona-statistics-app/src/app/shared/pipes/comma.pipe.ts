import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'comma' })
export class CommaPipe implements PipeTransform {
  transform(data: number): String | number {
    let numberOfDigits = 1;
    let num = Math.floor(data / 10);

    while (num > 0) {
      numberOfDigits++;
      num = Math.floor(num / 10);
    }

    let commaIndex = 0;
    if (numberOfDigits >= 4) {
      commaIndex = (numberOfDigits % 4) + 1;
      const resArr = data.toString().split('');
      resArr.splice(commaIndex, 0, ',');
      return resArr.join('');
    }

    return data;
  }
}
