 import { Component, Input } from '@angular/core';

import { GameStatus, User } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPipePipe } from './status-pipe/status-pipe.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusPipePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  statusOptions = Object.values(GameStatus);

  //@Input() isExtendedView = true;
  @Input() player: User | undefined;

  selectedStatus: string = 'all';
  sortDirection: 'asc' | 'desc' = 'desc';
 
  
  handleSortDirectionClick(direction: 'asc' | 'desc') {
     this.sortDirection = direction;
   }
 
   
}
