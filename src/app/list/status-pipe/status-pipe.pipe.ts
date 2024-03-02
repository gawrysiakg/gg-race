import { Pipe, PipeTransform } from '@angular/core';
import { GameHistory } from '../../models';

@Pipe({
  name: 'statusPipe',
  standalone: true,
  // pure: false, // (default is true)
  // filterBy i sortDirection. Jeśli te parametry mogą zmieniać się niezależnie od tablicy wejściowej gameHistory,
  // ustawienie potoku na nieczysty umożliwi mu ponowne uruchomienie i ponowne obliczenie danych wyjściowych za każdym razem, gdy te parametry się zmienią
})
export class StatusPipePipe implements PipeTransform {
  transform(
    gameHistory: Array<GameHistory>,
    filterBy: string,
    sortDirection: string
  ): Array<GameHistory> {
    if (!gameHistory) {
      return [];
    }

    const ascSort = (a: GameHistory, b: GameHistory) =>
      a.date.getTime() - b.date.getTime();
    const descSort = (a: GameHistory, b: GameHistory) =>
      b.date.getTime() - a.date.getTime();

    if (sortDirection === 'asc') {
      return filterBy === 'all'
        ? [...gameHistory]
        : gameHistory.filter((game) => game.gameStatus === filterBy);
    }

    if (sortDirection === 'desc') {
      return filterBy === 'all'
        ? gameHistory.slice().sort(descSort)
        : gameHistory
            .filter((game) => game.gameStatus === filterBy)
            .sort(descSort);
    }

    return gameHistory;
  }
}
