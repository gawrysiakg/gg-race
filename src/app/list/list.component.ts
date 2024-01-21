import { Component, Input } from '@angular/core';
import { GameStatus, User } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPipePipe } from './status-pipe.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusPipePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  statusOptions = Object.values(GameStatus);

  @Input() isExtendedView = true;
  @Input() player: User | undefined;

  selectedStatus: string = 'all';
  //sortDirection: 'asc' | 'desc' = 'asc';
  sortDirection = 'asc';

  filterOptions = {
    selectedStatus: this.selectedStatus,
    sortDirection: this.sortDirection
  };

  // get sortedGameHistory(): any[] {
  //   let gameHistory = this.player?.lastGameHistory || [];

  //   // Sortowanie według statusu i kierunku
  //   gameHistory = gameHistory.sort((a, b) => {
  //     const factor = this.sortDirection === 'asc' ? 1 : -1;
  //     return factor * (a.gameStatus.localeCompare(b.gameStatus));
  //   });

  //   // Filtruj według wybranego statusu
  //   if (this.selectedStatus !== 'all') {
  //     gameHistory = gameHistory.filter(item => item.gameStatus === this.selectedStatus);
  //   }

  //   return gameHistory;
  // }

  onStatusChange() {
    // Tutaj możesz dodać logikę, jeśli chcesz wykonać jakieś akcje po zmianie statusu
  }

  changeSortDirection(direction: 'asc' | 'desc') {
    this.filterOptions.sortDirection = direction;
  }

}
