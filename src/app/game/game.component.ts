import { Component } from '@angular/core';
import { NgxRaceModule } from 'ngx-race';
import { GameTimerComponent } from './game-timer/game-timer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgxRaceModule, GameTimerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent  {

  public darkMode=true;
  public theme = this.darkMode ? "black-and-white" : '';
  public darkModeButton = this.darkMode ? "Dark Mode OFF" : "Dark Mode ON";
  public points = 0;
  public date = new Date();



  public grantPoints() {
    console.log('points');
    this.points++;
}

toggleDarkMode(){
  this.darkMode=!this.darkMode;
  this.darkModeButton = this.darkMode ? "Dark Mode OFF" : "Dark Mode ON";
}


public elapsedTime: number = 0;
private timer: any;
private interval: number = 10; // interwał w milisekundach (tu ustawiony na 10ms)

timerStart(): void {
  // Ustawia interwał aktualizacji co interwał (w milisekundach)
  this.timer = setInterval(() => {
    this.elapsedTime += this.interval / 1000; // dodaj interwał w sekundach
    this.elapsedTime = parseFloat(this.elapsedTime.toFixed(2)); // ogranicz do dwóch miejsc po przecinku
  }, this.interval);
}

timerStop(): void {
  // Zatrzymuje interwał przed zniszczeniem komponentu, aby uniknąć wycieków pamięci
  clearInterval(this.timer);
}


}
