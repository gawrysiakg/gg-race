import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
import { GameStatus, User } from './models';
import { PersonFormComponent } from './intro/person-form/person-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //  CommonModule,
    //  NgFor,
    // GameComponent,
    // ScoreComponent,
    // PersonFormComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gg-race';
}
