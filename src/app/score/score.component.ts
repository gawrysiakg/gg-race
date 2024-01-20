import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {

  //@Output() public isLoggedIn = new EventEmitter<boolean>();

  @Input() usersList:Array<User> = [];

}
