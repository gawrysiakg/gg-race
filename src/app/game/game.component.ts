import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { CommonModule, NgFor } from '@angular/common';
import { User } from '../models';
import { GameStatus } from '../models';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { ListComponent } from '../list/list.component';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    NgxRaceModule,
    NgFor,
    GameOverDialogComponent,
    ListComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  public darkMode = true;
  public theme = this.darkMode ? 'black-and-white' : '';
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
  public showGameOverDialog = false;
  public statusOptions = Object.values(GameStatus);

  public player: User | undefined;
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService,
    private _scoreService: ScoreService
  ) {
    this.player = _playerInfo.getCurrentPlayer;
    if (!this.player) {
      this._router.navigate(['/intro']);
    }
  }

  // @Output() public isEndGame = new EventEmitter<boolean>();
  // @Output() public displayScoreAfterGame = new EventEmitter<boolean>();

  openDialog(): void {
    this.showGameOverDialog = true;
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
  }

  toggleShowMoreButton() {
    this.isExtendedView = !this.isExtendedView;
    this.showMoreButton = this.isExtendedView ? 'Simple View' : 'Extended View';
    this.gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'];
  }

  gameOver(): void {
    this.openDialog();
    this.gameStarted = false;
    this.turboMode = false;
    if (this.player) {
      this.updatePlayerGameHistory(GameStatus.GAME_OVER);
      this._playerInfo.updatePlayer(this.player);
    }
    this.timerStop();
  }

  restart() {
    this.handleActionReset();
    this.game.actionReset();
    this.gameStarted = false;
    this.showGameOverDialog = false;
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
      this._scoreService.sendScoreToServer(this.player, this.points).subscribe(
        (response) => {
          console.log('Score sent successfully!', response);
        },
        (error) => {
          console.error('Error while sending score:', error);
        }
      );
    }
    this.isGameOver = true;

    this._router.navigate(['/my-scores']);
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
}
