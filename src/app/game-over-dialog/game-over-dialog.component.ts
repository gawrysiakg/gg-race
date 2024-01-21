import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-over-dialog',
  standalone: true,
  imports: [],
  templateUrl: './game-over-dialog.component.html',
  styleUrl: './game-over-dialog.component.scss'
})
export class GameOverDialogComponent {
  @Output() quitGame = new EventEmitter<void>();
  @Output() restartGame = new EventEmitter<void>();

  onQuit(): void {
    this.quitGame.emit();
  }

  onRestart(): void {
    this.restartGame.emit();
  }
}
