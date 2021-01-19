import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({ name: 'localeDateFormat' })
export class LocaleDateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    const day =
      date.getDate().toString().length < 2
        ? '0' + date.getDate()
        : date.getDate();

    const month =
      (date.getDate() + 1).toString().length < 2
        ? '0' + (date.getDate() + 1)
        : date.getDate() + 1;

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
