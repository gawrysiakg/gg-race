import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { GameTimerComponent } from './game-timer/game-timer.component';
import { CommonModule } from '@angular/common';
import { User } from '../models';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,  NgxRaceModule, GameTimerComponent],
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





  public grantPoints() {
    console.log('points');
    this.points++;
    if (this.player) {
      this.player.points = this.points;
    }
}

toggleDarkMode(){
  this.darkMode=!this.darkMode;
  this.darkModeButton = this.darkMode ? "Dark Mode OFF" : "Dark Mode ON";
}
toggleShowMoreButton(){
  this.isExtendedView = !this.isExtendedView;
  this.showMoreButton = this.isExtendedView ? 'Simple View' : 'Extended View';
  this.gameClass = this.isExtendedView ? ['game-center'] : ['game-simple'];
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
  }

  this.handleActionReset();
 // this.gameStarted=false
 
}

handleActionReset(){
  this.timerStop();
  this.elapsedTime= 0;
  this.points=0;
}

quitGame(){
  this.isLoggedIn.emit(false);
  this.isGameOver=true;
}

handleStart(){
  this.timerStart()
  this.gameStarted = true;
}
handleStop(){
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

}
