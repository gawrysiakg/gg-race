import { Pipe, PipeTransform } from '@angular/core';
import { ScoresListItem } from '../../models';

@Pipe({
  name: 'myBestScores',
  standalone: true,
})
export class MyBestScoresPipe implements PipeTransform {
  transform(
    scores: Array<ScoresListItem>,
    sortDirection: string,
    playerName: string
  ): Array<ScoresListItem> {
    if (!scores || !scores.length) {
      return [];
    }

    const sortedScores = scores.slice().sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });

    if (playerName !== undefined) {
      return sortedScores.filter((item) => item.name === playerName);
    }

    return sortedScores;
  }

  // transform(
  //   score: Array<ScoresListItem>,
  //   sortDirection: string,
  //   playerName: string
  // ): Array<ScoresListItem> {
  //   if (!score) {
  //     return [];
  //   }

  //   const ascSort = (a: ScoresListItem, b: ScoresListItem) => a.score - b.score;
  //   const descSort = (a: ScoresListItem, b: ScoresListItem) =>
  //     b.score - a.score;

  //   if (sortDirection === 'asc' && playerName !== undefined) {
  //     return score
  //       .slice()
  //       .sort(ascSort)
  //       .filter((item) => item.name === playerName);
  //   }

  //   if (sortDirection === 'desc' && playerName !== undefined) {
  //     return score
  //       .slice()
  //       .sort(descSort)
  //       .filter((item) => item.name === playerName);
  //   }
  //   return [];
  // }
}
