import { Component, HostListener, ViewChild } from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { CommonModule, NgFor } from '@angular/common';
import { ScoresListItem, User } from '../models';
import { GameStatus } from '../models';
import { ListComponent } from '../list/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { ScoreService } from '../score.service';
import { Observable, map, of } from 'rxjs';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NgxRaceModule, NgFor, ListComponent, ScoreComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  public darkMode =
    this._route.snapshot.params['colors'] === 'high contrast' ? true : false;
  //public theme = this.darkMode ? 'black-and-white' : '';
  public theme =
    this._route.snapshot.params['colors'] === 'high%20contrast'
      ? 'black-and-white'
      : '';

  public darkModeButton = this.darkMode ? 'Dark Mode OFF' : 'Dark Mode ON';
  public points = 0;
  public boardHeight: number = 20;
  public boardWidth: number = 12;
  public gameStarted = false;
  public turboMode = false;
  public showMoreButton = 'Simple View';
  public isExtendedView = true;
  public gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'];
  public isGameOver = false;
  public statusOptions = Object.values(GameStatus);
  public showScore = false;
  public scoreButtonText = 'Hide score';
  public score$: Observable<Array<ScoresListItem>>; //= of([]);

  public player: User | undefined;
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService,
    private _scoreService: ScoreService,
    private _route: ActivatedRoute
  ) {
    this.player = _playerInfo.getCurrentPlayer;
    this.updatePlayerGameHistory(GameStatus.READY);
    // checked by guard
    // if (!this.player) {
    //   this._router.navigate(['/intro']);
    // }
    this.score$ = this._scoreService.loadScore().pipe(
      map((users) => {
        return users.filter((item) => item.name === this.player?.name);
      })
    );
    // .subscribe((result) => (this.score = result));
  }

  public grantPoints() {
    this.points++;
    if (this.player) {
      this.player.points++;
      this.updatePlayerGameHistory(GameStatus.OVERTAKING);
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.darkModeButton = this.darkMode ? 'Dark Mode OFF' : 'Dark Mode ON';
    const mode = this.darkMode
      ? GameStatus.DARK_MODE_ON
      : GameStatus.DARK_MODE_OFF;
    if (this.player) {
      this.updatePlayerGameHistory(mode);
    }
    if (this.darkMode) {
      this._router.navigate(['/game/high contrast']);
    } else {
      this._router.navigate(['/game/normal']);
    }
  }

  toggleShowMoreButton() {
    this.isExtendedView = !this.isExtendedView;
    this.showMoreButton = this.isExtendedView ? 'Simple View' : 'Extended View';
    this.gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'];
  }

  gameOver(): void {
    // this.openDialog(); // zmienione na komponent score z filtrowaniem po name
    this.gameStarted = false;
    this.turboMode = false;
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.GAME_OVER);
      this._playerInfo.updatePlayer(this.player);
    }
    this.timerStop();
    this.toggleScore();

    // to pozwoli wysłać score na serwer
    this._scoreService.sendScoreToServer(this.player!, this.points).subscribe(
      (response) => {
        console.log('Score sent successfully!', response);
      },
      (error) => {
        console.error('Error while sending score:', error);
      }
    );
  }

  restart() {
    this.handleActionReset();
    this.game.actionReset();
    this.gameStarted = false;
  }

  handleActionReset() {
    if (this.player) {
      this.player.lastGameHistory = [];
    }
    this.timerStop();
    this.elapsedTime = 0;
    this.points = 0;
    this.updatePlayerGameHistory(GameStatus.READY);
  }

  quitGame() {
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.QUIT_GAME);
      this.player = { ...this.player };
    }
    this.isGameOver = true;
    this.toggleScore();
  }

  handleStart() {
    this.timerStart();
    this.gameStarted = true;
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.STARTED);
    }
  }

  handleStop() {
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.PAUSED);
    }
    this.timerStop();
    this.gameStarted = false;
  }

  enableTurboMode() {
    this.turboMode = true;
    this.game.actionTurboOn();
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.TURBO_ON);
    }
  }

  disableTurboMode() {
    this.turboMode = false;
    this.game.actionTurboOff();
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.TURBO_OFF);
    }
  }

  public elapsedTime: number = 0;
  private timer: any;
  private interval: number = 100;

  timerStart(): void {
    console.log('timer started');
    this.timer = setInterval(() => {
      this.elapsedTime += this.interval / 1000;
      this.elapsedTime = parseFloat(this.elapsedTime.toFixed(2));
    }, this.interval);
  }

  timerStop(): void {
    console.log('timer stopped');
    clearInterval(this.timer);
  }

  @ViewChild('game') game!: NgxRaceComponent;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.game.actionTurboOn();
        break;
      case 'ArrowDown':
        this.game.actionTurboOff();
        break;
      case 'ArrowLeft':
        this.game.actionLeft();
        break;
      case 'ArrowRight':
        this.game.actionRight();
        break;
      case 'p':
        this.handleStart();
        this.game.actionStart();
        break;
      case 's':
        this.handleStop();
        this.game.actionStop();
        break;
    }
  }

  private updatePlayerGameHistory(gameStatus: GameStatus) {
    if (this.player) {
      this.player.lastGameHistory = [...this.player.lastGameHistory];
      this.player.lastGameHistory.push({
        gameStatus,
        date: new Date(),
        elapsedTime: this.elapsedTime,
      });
    }
  }

  toggleScore() {
    this.showScore = !this.showScore;
    if (!this.showScore) {
      this._router.navigate(['/intro']);
      this._playerInfo.removeCurrentPLayer();
    }
  }

  displayScoreAfterGame() {
    this.quitGame();
    this.toggleScore();
  }
}
