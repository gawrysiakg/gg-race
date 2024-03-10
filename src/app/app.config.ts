import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      // kolejność jest ważna
      { path: 'intro', component: AppComponent },
      { path: 'game', component: GameComponent },
      { path: 'score', component: ScoreComponent },
      { path: '**', redirectTo: 'intro' },
    ]),
  ],
};
