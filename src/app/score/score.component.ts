import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {

  //@Output() public isLoggedIn = new EventEmitter<boolean>();

  @Input() usersList:Array<User> = [];

}
