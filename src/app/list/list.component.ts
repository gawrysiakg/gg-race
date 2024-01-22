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
  sortDirection: 'asc' | 'desc' = 'desc';
 

  

  // filterOptions = {
  //   selectedStatus: this.selectedStatus,
  //   sortDirection: this.sortDirection
  // };

  


  
  // handleSortDirectionClick(direction: 'asc' | 'desc') {
  //  this.filterOptions = {...this.filterOptions};
  //   this.filterOptions.sortDirection=direction;
  //   this.sortDirection=direction;
  //   console.log( this.filterOptions.sortDirection);
  //   // if(this.player)
  //   // this.player = { ...this.player }; // Utworzenie nowej instancji obiektu player
  // }
  handleSortDirectionClick(direction: 'asc' | 'desc') {
     this.sortDirection=direction;
   }
 
   

}
