import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { GameStatus, User } from '../models';
import { PersonFormComponent } from './person-form/person-form.component';
import { IntroTextComponent } from './intro-text/intro-text.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [PersonFormComponent, IntroTextComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService
  ) {}

  public player: User | undefined;
  isLoggedIn = false;

  setCurrentPlayer(event: User) {
    this.player = event;
    this._playerInfo.setCurrentPLayer(event);
    this.isLoggedIn = true;
  }

  startGame() {
    this.player?.lastGameHistory.push({
      gameStatus: GameStatus.READY,
      date: new Date(),
      elapsedTime: 0,
    });
    this.isLoggedIn = true;
  }
}
