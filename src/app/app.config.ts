import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GameComponent } from './game/game.component';
import { IntroComponent } from './intro/intro.component';
import { provideHttpClient } from '@angular/common/http';
import { playerDataGuard } from './player-data.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      // kolejność jest ważna
      { path: 'intro', component: IntroComponent },
      {
        path: 'game',
        component: GameComponent,
        canActivate: [playerDataGuard],
      },
      {
        path: 'game/:colors',
        component: GameComponent,
        canActivate: [playerDataGuard],
      },
      { path: '**', redirectTo: 'intro' },
    ]),
    provideHttpClient(),
  ],
};
