import { Pipe, PipeTransform } from '@angular/core';
import { ScoresListItem } from '../../models';

@Pipe({
  name: 'bestScore',
  standalone: true,
})
export class BestScorePipe implements PipeTransform {
  transform(
    score: Array<ScoresListItem>,
    sortDirection: string
  ): Array<ScoresListItem> {
    if (!score) {
      return [];
    }

    const ascSort = (a: ScoresListItem, b: ScoresListItem) => a.score - b.score;
    const descSort = (a: ScoresListItem, b: ScoresListItem) =>
      b.score - a.score;

    if (sortDirection === 'asc') {
      return score.slice().sort(ascSort);
    }

    if (sortDirection === 'desc') {
      return score.slice().sort(descSort);
    }
    return [];
  }
}
