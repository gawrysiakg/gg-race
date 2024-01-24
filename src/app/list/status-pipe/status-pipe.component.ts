import { Component } from '@angular/core';
import { GameHistory } from '../../models';

@Component({
  selector: 'app-status-pipe',
  standalone: true,
  imports: [],
  templateUrl: './status-pipe.component.html',
  styleUrl: './status-pipe.component.scss'
})
export class StatusPipeComponent {


  transform(gameHistory: GameHistory[], filterBy: string, sortDirection: string ): GameHistory[] {
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
