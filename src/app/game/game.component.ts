import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { GameTimerComponent } from './game-timer/game-timer.component';
import { CommonModule, NgFor } from '@angular/common';
import { User } from '../models';
import { GameStatus } from '../models';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,  NgxRaceModule, GameTimerComponent, NgFor],
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
   

  @Output() public isLoggedIn = new EventEmitter<boolean>();
  @Output() public displayScoreAfterGame = new EventEmitter<boolean>();
  @Input() public player: User | undefined;

  // public statuses: GameStatus[] = this.player?.lastGameHistory
  // ?.map(history => history.gameStatus)
  // .reduce((acc: GameStatus[], item: GameStatus) => {
  //   if (!acc.includes(item)) {
  //     acc.push(item);
  //   }
  //   return acc; 
  // }, []) ?? [];


  public grantPoints() {
    console.log('points');
    this.points++;
    if (this.player) {
      this.player.points = this.points;
      this.player.lastGameHistory.push({gameStatus: GameStatus.OVERTAKING, date: new Date()})
    }
  
}

toggleDarkMode(){
  this.darkMode=!this.darkMode;
  this.darkModeButton = this.darkMode ? "Dark Mode OFF" : "Dark Mode ON";
  const mode = this.darkMode ? GameStatus.DARK_MODE_ON : GameStatus.DARK_MODE_OFF;
  if (this.player) {
    this.player.lastGameHistory.push({gameStatus: mode, date: new Date()})
  }
}
toggleShowMoreButton(){
  this.isExtendedView = !this.isExtendedView;
  this.showMoreButton = this.isExtendedView ? 'Simple View' : 'Extended View';
  this.gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'];
  const mode = this.isExtendedView ? GameStatus.EXTENDED_VIEW : GameStatus.SIMPLE_VIEW;
  if (this.player) {
    this.player.lastGameHistory.push({gameStatus: mode, date: new Date()})
  }
}

// gameOver(){
//   alert("Game over, total points: "+ this.points);
//   this.timerStop();
//   this.isGameOver=true;
//   this.quitGame()
// }

gameOver(): void {
  const confirmation = window.confirm(`Game over ${this.player?.name}, total points: ${this.points}\n
  Click OK to end game`);
  this.gameStarted = false;
  this.turboMode = false;

  if (confirmation) {
    this.timerStop();
    this.isGameOver = true;
    this.quitGame();
    this.displayScoreAfterGame.emit(true);
    this.player?.lastGameHistory.push({gameStatus: GameStatus.GAME_OVER, date: new Date()})
  }

  this.handleActionReset();
  this.game.actionReset();
 
  
 // this.gameStarted=false
 
}

handleActionReset(){
  this.timerStop();
  this.elapsedTime= 0;
  this.points=0;
  this.player?.lastGameHistory.push({gameStatus: GameStatus.RESETED, date: new Date()})
}

quitGame(){
  this.isLoggedIn.emit(false);
  this.isGameOver=true;
  this.player?.lastGameHistory.push({gameStatus: GameStatus.QUIT_GAME, date: new Date()})
  
}

handleStart(){
  this.timerStart()
  this.gameStarted = true;
  if (this.player) {
    this.player.lastGameHistory.push({gameStatus: GameStatus.STARTED, date: new Date()})
  }
}
handleStop(){
  if (this.player) {
    this.player.lastGameHistory.push({gameStatus: GameStatus.PAUSED, date: new Date()})
  }
  this.timerStop()
  this.gameStarted = false;
}


public elapsedTime: number = 0;
private timer: any;
private interval: number = 100; // interwał w milisekundach (tu ustawiony na 10ms)

timerStart(): void {
  // Ustawia interwał aktualizacji co interwał (w milisekundach)
  console.log("timer started")
  this.timer = setInterval(() => {
    this.elapsedTime += this.interval / 1000; // dodaj interwał w sekundach
    this.elapsedTime = parseFloat(this.elapsedTime.toFixed(2)); // ogranicz do dwóch miejsc po przecinku
  }, this.interval);
}

timerStop(): void {
  console.log("timer stopped")
  clearInterval(this.timer);
}




onInit(){
  this.isGameOver=false;
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
      this.handleStart()
      this.game.actionStart();
      break;
    case 's':
      this.handleStop()
      this.game.actionStop();
      break; 
  }
}

}
