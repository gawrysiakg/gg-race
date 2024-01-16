import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-timer',
  standalone: true,
  imports: [],
  templateUrl: './game-timer.component.html',
  styleUrl: './game-timer.component.scss'
})
export class GameTimerComponent   {
  public elapsedTime: number = 0;
  private timer: any;

  timerStart(): void {
    // Ustawia interwał aktualizacji co sekundę (1000ms)
    this.timer = setInterval(() => {
      this.elapsedTime += 1;
    }, 1000);
  }

  timerStop(): void {
    // Zatrzymuje interwał przed zniszczeniem komponentu, aby uniknąć wycieków pamięci
    clearInterval(this.timer);
  }
}
