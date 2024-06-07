import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { GameStatus, ScoresListItem, User } from '../models';
import { PersonFormComponent } from './person-form/person-form.component';
import { IntroTextComponent } from './intro-text/intro-text.component';
import { ScoreComponent } from '../score/score.component';
import { ScoreService } from '../score.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    PersonFormComponent,
    IntroTextComponent,
    ScoreComponent,
    FormsModule,
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  public score$: Observable<Array<ScoresListItem>>; //= of([]);
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService,
    private _scoreService: ScoreService
  ) {
    // this.player = _playerInfo.getCurrentPlayer; //nie chcę przypisywać gracza, bo po przejściu z game do intro przez url pamiętało imię gracza
    this.score$ = this._scoreService.loadScore() || of([]);
    // .subscribe((result) => (this.score = result)); // added async
  }
  public selectedColor = 'normal';
  public isAuthenticated = false;
  public player: User | undefined;
  public scoreButtonText = 'Show score';
  public showScore = false;
  intervalId: any;

  setCurrentPlayer(event: User) {
    this._playerInfo.validateToken(event.token).subscribe((result) => {
      this.isAuthenticated = result.success;
      if (this.isAuthenticated) {
        this._playerInfo.setCurrentPLayer(event);

        this.player = this._playerInfo.getCurrentPlayer;
        this.startGame();
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
    this._router.navigate(['/game', this.selectedColor]);
  }

  toggleScore() {
    this.scoreButtonText = this.showScore ? 'Show score' : 'Hide score';
    this.showScore = !this.showScore;
  }

  displayScoreAfterGame() {
    this.toggleScore();
  }

  logout() {
    this.player = undefined;
    this._playerInfo.removeCurrentPLayer();
  }
}
