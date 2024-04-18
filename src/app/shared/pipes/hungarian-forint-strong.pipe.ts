import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hungarianForintStrong',
})
export class HungarianForintStrongPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
