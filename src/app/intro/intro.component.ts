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
  ) {
    this.player = _playerInfo.getCurrentPlayer;
  }

  public player: User | undefined;
  //isLoggedIn = false;
  public scoreButtonText = 'Show score';

  setCurrentPlayer(event: User) {
    this._playerInfo.setCurrentPLayer(event);
    //this.isLoggedIn = true;
    this.player = this._playerInfo.getCurrentPlayer;
  }

  startGame() {
    this.player?.lastGameHistory.push({
      gameStatus: GameStatus.READY,
      date: new Date(),
      elapsedTime: 0,
    });
    //this.isLoggedIn = true;
    this._router.navigate(['/game']);
  }

  toggleScore() {
    this.scoreButtonText = 'Show score' ? 'Hide score' : 'Show score';
    this._router.navigate(['/score']);
  }

  displayScoreAfterGame() {
    this.toggleScore();
  }

  logout() {
    this.player = undefined;
    this._playerInfo.removeCurrentPLayer();
    // this.isLoggedIn = false;
  }
}
