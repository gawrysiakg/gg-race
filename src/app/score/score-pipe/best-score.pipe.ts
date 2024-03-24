import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../../models';

@Pipe({
  name: 'bestScore',
  standalone: true,
})
export class BestScorePipe implements PipeTransform {
  transform(score: Array<Score>, sortDirection: string): Array<Score> {
    if (!score) {
      return [];
    }

    const ascSort = (a: Score, b: Score) => a.score - b.score;
    const descSort = (a: Score, b: Score) => b.score - a.score;

    if (sortDirection === 'asc') {
      return score.slice().sort(ascSort);
    }

    if (sortDirection === 'desc') {
      return score.slice().sort(descSort);
    }
    return [];
  }
}
