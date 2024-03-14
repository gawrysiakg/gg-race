import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
import { GameStatus, User } from './models';
import { PersonFormComponent } from './intro/person-form/person-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    GameComponent,
    ScoreComponent,
    PersonFormComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gg-race';

  usersList: Array<User> = [];
  public isGameStarted = false;
  public showScore = false;

  public userId = 1;
  public player: User | undefined;
  public playerName: string = '';
  public isMainScreen = true;
  public isLoggedIn = false;

  setCurrentPlayer(event: User) {
    this.player = event;
    this.player.id = this.userId;
    this.userId++;
    this.playerName = this.player.name;
    this.isLoggedIn = true;
  }

  startGame() {
    this.isGameStarted = true;
    this.isMainScreen = false;
    this.player?.lastGameHistory.push({
      gameStatus: GameStatus.READY,
      date: new Date(),
      elapsedTime: 0,
    });
  }

  quitGame(event: boolean) {
    this.isGameStarted = event; //event z gry jak skończy grać
    if (this.player) {
      const newPlayer: User = { ...this.player };
      this.usersList.push(newPlayer);
    }
    this.isMainScreen = true;
  }
}
