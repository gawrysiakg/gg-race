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

  @Output() public isLoggedIn = new EventEmitter<boolean>();
  @Input() public player: User | undefined;





  public grantPoints() {
    console.log('points');
    this.points++;
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

gameOver(){
  alert("Game over, total points: "+ this.points);
  this.timerStop();
}

handleActionReset(){
  this.timerStop();
  this.elapsedTime= 0;
  this.points=0;
}

quitGame(){
  this.isLoggedIn.emit(false);
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


}
