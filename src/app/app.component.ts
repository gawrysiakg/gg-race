import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GameComponent } from './game/game.component';
import { IntroComponent } from './intro/intro.component';
import { ScoreComponent } from './score/score.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IntroComponent, GameComponent, ScoreComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gg-race';

  public isLoggedIn = false;
  isGameOver = false;



  logIn(event: boolean){
    this.isLoggedIn=event;
  }

  quitGame(event: boolean){
    this.isLoggedIn=event;
  }
}
