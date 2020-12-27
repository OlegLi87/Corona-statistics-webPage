import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hebrewDateFormat' })
export class HebrewDateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    if (!date) return '';
    const months = [
      'בדצמבר',
      'בנובמבר',
      'באוקטובר',
      'בספטמבר',
      'באוגוסט',
      'ביולי',
      'ביוני',
      'במאי',
      'באפריל',
      'במרץ',
      'בפברואר',
      'בינואר',
    ].reverse();

    return (
      date.getDate() +
      ' ' +
      months[date.getMonth()] +
      ' ' +
      date.getFullYear() +
      '|' +
      date.getHours() +
      ':' +
      date.getMinutes()
    );
  }
}
