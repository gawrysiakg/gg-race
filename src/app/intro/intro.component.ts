import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { GameStatus, ScoresListItem, User } from '../models';
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
  public isAuthenticated = false;

  public player: User | undefined;
  public scoreButtonText = 'Show score';

  setCurrentPlayer(event: User) {
    this._playerInfo.validateToken(event.token).subscribe((result) => {
      this.isAuthenticated = result.success;
      if (this.isAuthenticated) {
        this._playerInfo.setCurrentPLayer(event);

        this.player = this._playerInfo.getCurrentPlayer;
      } else {
        alert('Invalid token');
      }
    });
  }

  startGame() {
    this.player?.lastGameHistory.push({
      gameStatus: GameStatus.READY,
      date: new Date(),
      elapsedTime: 0,
    });
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
