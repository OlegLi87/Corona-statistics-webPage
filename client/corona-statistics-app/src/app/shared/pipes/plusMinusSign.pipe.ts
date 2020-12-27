import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'plusMinusSign' })
export class PlusMinusSignPipe implements PipeTransform {
  transform(data: number): string {
    if (data > 0) return '+';
    if (data < 0) return '-';
    return '';
  }
}
