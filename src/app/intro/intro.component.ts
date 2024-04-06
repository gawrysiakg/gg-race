import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { GameStatus, ScoresListItem, User } from '../models';
import { PersonFormComponent } from './person-form/person-form.component';
import { IntroTextComponent } from './intro-text/intro-text.component';
import { ScoreComponent } from '../score/score.component';
import { ScoreService } from '../score.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [PersonFormComponent, IntroTextComponent, ScoreComponent],
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
    this.player = _playerInfo.getCurrentPlayer;
    this.score$ = this._scoreService.loadScore();
    // .subscribe((result) => (this.score = result));
  }
  public isAuthenticated = false;

  public player: User | undefined;
  //public score: Array<ScoresListItem> = [];

  // =
  // this._scoreService.loadScore();
  public scoreButtonText = 'Show score';
  public showScore = false;
  intervalId: any; //

  // ngOnInit(): void {
  //   this.score$ = this._scoreService.loadScore();
  // }

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
    // this.scoreButtonText = 'Show score' ? 'Hide score' : 'Show score';
    this.scoreButtonText = this.showScore ? 'Show score' : 'Hide score';
    this.showScore = !this.showScore;
    //this._router.navigate(['/score']);
  }

  displayScoreAfterGame() {
    this.toggleScore();
  }

  logout() {
    this.player = undefined;
    this._playerInfo.removeCurrentPLayer();
    // this.isLoggedIn = false;
  }

  // ngOnInit(): void {
  //   this.refreshScoreList();

  //   this.intervalId = setInterval(() => {
  //     this.refreshScoreList();
  //   }, 30000); // 30 sekund (30000 milisekund)
  // }

  // refreshScoreList() {
  //   this._scoreService.loadScore().subscribe((result) => (this.score = result));
  // }

  // closeScore() {
  //   this._router.navigate(['/intro']);
  // }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
