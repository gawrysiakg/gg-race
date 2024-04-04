import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
import { IntroComponent } from './intro/intro.component';
import { provideHttpClient } from '@angular/common/http';
import { MyScoresComponent } from './my-scores/my-scores.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      // kolejność jest ważna
      { path: 'intro', component: IntroComponent },
      { path: 'game', component: GameComponent },
      { path: 'score', component: ScoreComponent },
      { path: 'my-scores', component: MyScoresComponent },
      { path: '**', redirectTo: 'intro' },
    ]),
    provideHttpClient(),
  ],
};
