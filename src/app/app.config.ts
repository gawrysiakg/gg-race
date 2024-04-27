import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GameComponent } from './game/game.component';
import { IntroComponent } from './intro/intro.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      // kolejność jest ważna
      { path: 'intro', component: IntroComponent },
      { path: 'game', component: GameComponent },
      { path: 'game/:colors', component: GameComponent },
      { path: '**', redirectTo: 'intro' },
    ]),
    provideHttpClient(),
  ],
};
