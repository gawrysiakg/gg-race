import { Pipe, PipeTransform } from '@angular/core';
import { GameHistory } from '../models';

@Pipe({
  name: 'statusPipe',
  standalone: true
})
export class StatusPipePipe implements PipeTransform {

  transform(gameHistory: Array<GameHistory>, filterBy: string, sortDirection: string): Array<GameHistory> {
    if(sortDirection==='asc'){
      if (filterBy === 'all') {
     return gameHistory;
   }
   return gameHistory.filter(gameHistory => gameHistory.gameStatus === filterBy);

 } else {
     if (filterBy === 'all') {
       return gameHistory.sort((a,b)=> b.elapsedTime-a.elapsedTime);
     }
     return gameHistory.filter(gameHistory => gameHistory.gameStatus === filterBy).sort((a,b)=> b.elapsedTime-a.elapsedTime);
   }
  }

}
