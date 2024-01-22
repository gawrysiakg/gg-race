import { Pipe, PipeTransform } from '@angular/core';
import { GameHistory } from '../models';

@Pipe({
  name: 'statusPipe',
  standalone: true,
  pure: false // (default is true)
  // filterBy i sortDirection. Jeśli te parametry mogą zmieniać się niezależnie od tablicy wejściowej gameHistory,
  // ustawienie potoku na nieczysty umożliwi mu ponowne uruchomienie i ponowne obliczenie danych wyjściowych za każdym razem, gdy te parametry się zmienią
})
export class StatusPipePipe implements PipeTransform {

//   transform(gameHistory: Array<GameHistory>, filterBy: string, sortDirection: string): Array<GameHistory> {
//     if(sortDirection==='asc'){
//       if (filterBy === 'all') {
//      return gameHistory;
//    }
//    return gameHistory.filter(gameHistory => gameHistory.gameStatus === filterBy);
//  } 


//  if (sortDirection==='desc'){
//      if (filterBy === 'all') {
//        return gameHistory.sort((a,b)=> b.elapsedTime-a.elapsedTime);
//      }
//      return gameHistory.filter(gameHistory => gameHistory.gameStatus === filterBy).sort((a,b)=> b.elapsedTime-a.elapsedTime);
//    }
  
//    return [];

//   }
// }

transform(gameHistory: Array<GameHistory>, filterBy: string, sortDirection: string): Array<GameHistory> {
  if (sortDirection === 'asc') {
    if (filterBy === 'all') {
      return [...gameHistory]; // Return a new array to maintain immutability
    }
    return gameHistory.filter(history => history.gameStatus === filterBy);
  }

  if (sortDirection === 'desc') {
    if (filterBy === 'all') {
      // Return a new array to maintain immutability, and use slice to avoid modifying the original array
      return gameHistory.slice().sort((a, b) => b.elapsedTime - a.elapsedTime);
    }
    return gameHistory.filter(history => history.gameStatus === filterBy)
                      .slice() // Return a new array to maintain immutability
                      .sort((a, b) => b.elapsedTime - a.elapsedTime);
  }

  return [];
}
}
