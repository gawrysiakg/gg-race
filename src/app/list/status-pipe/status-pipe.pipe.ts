import { Pipe, PipeTransform } from '@angular/core';
import { GameHistory } from '../../models';

@Pipe({
  name: 'statusPipe',
  standalone: true,
  pure: false // (default is true)
  // filterBy i sortDirection. Jeśli te parametry mogą zmieniać się niezależnie od tablicy wejściowej gameHistory,
  // ustawienie potoku na nieczysty umożliwi mu ponowne uruchomienie i ponowne obliczenie danych wyjściowych za każdym razem, gdy te parametry się zmienią
})
export class StatusPipePipe implements PipeTransform {

transform(gameHistory: Array<GameHistory>, filterBy: string, sortDirection: string): Array<GameHistory> {
  if (sortDirection === 'asc') {
    if (filterBy === 'all') {
      return [...gameHistory]; 
    }
    return gameHistory.filter(history => history.gameStatus === filterBy);
  }

  if (sortDirection === 'desc') {
    if (filterBy === 'all') {
      return gameHistory.slice().sort((a, b) => b.date.getTime() - a.date.getTime()); //zwraca liczbę milisekund od 1 stycznia 1970 
    }
    return gameHistory.filter(history => history.gameStatus === filterBy)
                      .slice() // Return a new array to maintain immutability
                      .sort((a, b) =>  b.date.getTime() - a.date.getTime());
  }

  return [];
}
}
