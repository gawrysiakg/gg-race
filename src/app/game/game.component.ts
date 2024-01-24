import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { GameTimerComponent } from './game-timer/game-timer.component';
import { CommonModule, NgFor } from '@angular/common';
import { User } from '../models';
import { GameStatus } from '../models';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,  NgxRaceModule, GameTimerComponent, NgFor, GameOverDialogComponent, ListComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent  {

  public darkMode=true;
  public theme = this.darkMode ? "black-and-white" : '';
  public darkModeButton = this.darkMode ? "Dark Mode OFF" : "Dark Mode ON";
  public points = 0;
  public boardHeight: number = 20;
  public boardWidth: number = 14;
  public gameStarted = false;
  public turboMode = false;
  public showMoreButton = 'Simple View'
  public isExtendedView = true;
  public gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'] ;
  public isGameOver = false;
  statusOptions = Object.values(GameStatus);

  @Output() public isEndGame = new EventEmitter<boolean>();
  @Output() public displayScoreAfterGame = new EventEmitter<boolean>();
  @Input() public player: User | undefined;


  public grantPoints() {
    console.log('points');
    this.points++;
    if (this.player) {
      this.player.points = this.points;
      this.player.lastGameHistory.push({gameStatus: GameStatus.OVERTAKING, date: new Date(), elapsedTime: this.elapsedTime})
    }
  
}

toggleDarkMode(){
  this.darkMode=!this.darkMode;
  this.darkModeButton = this.darkMode ? "Dark Mode OFF" : "Dark Mode ON";
  const mode = this.darkMode ? GameStatus.DARK_MODE_ON : GameStatus.DARK_MODE_OFF;
  if (this.player) {
    this.player.lastGameHistory.push({gameStatus: mode, date: new Date(), elapsedTime: this.elapsedTime})
  }
}
toggleShowMoreButton(){
  this.isExtendedView = !this.isExtendedView;
  this.showMoreButton = this.isExtendedView ? 'Simple View' : 'Extended View';
  this.gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'];
  // const mode = this.isExtendedView ? GameStatus.EXTENDED_VIEW : GameStatus.SIMPLE_VIEW;
  // if (this.player) {
  //   this.player.lastGameHistory.push({gameStatus: mode, date: new Date(), elapsedTime: this.elapsedTime})
  // }
}

gameOver(): void {
  this.openDialog();
  this.gameStarted = false;
  this.turboMode = false;
  this.player?.lastGameHistory.push({gameStatus: GameStatus.GAME_OVER, date: new Date(), elapsedTime: this.elapsedTime});
  this.timerStop();
}

endGame(){ //emitowany z ramki game over
  this.isGameOver = true;
  this.quitGame();
  this.displayScoreAfterGame.emit(true);
}

restart(){
  this.handleActionReset();
  this.game.actionReset();
  this.gameStarted = false;
  this.showGameOverDialog = false
  if(this.player){
     this.player.lastGameHistory = [];
  }
  this.player?.lastGameHistory.push({gameStatus: GameStatus.RESETED, date: new Date(), elapsedTime: this.elapsedTime})
}

handleActionReset(){
  this.player?.lastGameHistory.push({gameStatus: GameStatus.RESETED, date: new Date(), elapsedTime: this.elapsedTime})
  this.timerStop();
  this.elapsedTime= 0;
  this.points=0;
}

quitGame(){
  this.player?.lastGameHistory.push({gameStatus: GameStatus.QUIT_GAME, date: new Date(), elapsedTime: this.elapsedTime})
  this.isEndGame.emit(false);
  this.isGameOver=true;
}

handleStart(){
  this.timerStart()
  this.gameStarted = true;
  this.player?.lastGameHistory.push({gameStatus: GameStatus.STARTED, date: new Date(), elapsedTime: this.elapsedTime})
}
handleStop(){
  this.player?.lastGameHistory.push({gameStatus: GameStatus.PAUSED, date: new Date(), elapsedTime: this.elapsedTime})
  this.timerStop()
  this.gameStarted = false;
}


public elapsedTime: number = 0;
private timer: any;
private interval: number = 100; 

timerStart(): void {
  console.log("timer started")
  this.timer = setInterval(() => {
    this.elapsedTime += this.interval / 1000; 
    this.elapsedTime = parseFloat(this.elapsedTime.toFixed(2)); 
  }, this.interval);
}

timerStop(): void {
  console.log("timer stopped")
  clearInterval(this.timer);
}




// onInit(){
//   this.isGameOver=false;
 
// }



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
      this.handleStart()
      this.game.actionStart();
      break;
    case 's':
      this.handleStop()
      this.game.actionStop();
      break; 
  }
}

  showGameOverDialog = false;

  openDialog(): void {
    this.showGameOverDialog = true;
  }




















}
