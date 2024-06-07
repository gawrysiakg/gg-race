import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlayerInfoService } from './player-info.service';

export const playerDataGuard: CanActivateFn = (route, state) => {
  const playerInfoService = inject(PlayerInfoService);
  const router = inject(Router);

  if (playerInfoService.getCurrentPlayer !== null) {
    return true;
  }
  alert('verify first');

  return router.createUrlTree(['/intro']);
};
