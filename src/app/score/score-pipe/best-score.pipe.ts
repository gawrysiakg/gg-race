import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bestScore',
  standalone: true
})
export class BestScorePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
