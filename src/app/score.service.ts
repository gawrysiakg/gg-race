import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoresListItem, User } from './models';
import {
  Observable,
  concatWith,
  interval,
  pipe,
  repeatWhen,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  //private SCORES_URL = 'https://scores.chrum.it/scores';
  private SCORES_URL = 'http://localhost:8080/scores';
  //const URL = 'https://scores.chrum.it/scores/race';
  //private URL = 'http://localhost:8080/scores/race';

  constructor(private _http: HttpClient) {}

  // loadScore(): Observable<Array<ScoresListItem>> {
  //   //const URL = 'https://scores.chrum.it/scores/race';
  //   const URL = 'http://localhost:8080/scores/race';
  //   return this._http
  //     .get<Array<ScoresListItem>>(URL, {
  //       headers: { Accept: 'application/json' },
  //     })
  //     .pipe(
  //       switchMap(() => interval(30000)),
  //       switchMap(() =>
  //         this._http.get<Array<ScoresListItem>>(URL, {
  //           headers: { Accept: 'application/json' },
  //         })
  //       )
  //     );
  // }

  loadScore(): Observable<Array<ScoresListItem>> {
    const URL = 'http://localhost:8080/scores/race';

    return this._http
      .get<Array<ScoresListItem>>(URL, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        // Use `shareReplay(1)` to share the latest emitted value with all subscribers.
        shareReplay(1),
        // Use `concatWith(interval(30000).pipe(switchMap(() => this.loadScore())))` to:
        // 1. Emit the initial value fetched from the HTTP request.
        // 2. After the initial value, emit new values every 30 seconds by calling `loadScore()` again.
        concatWith(interval(30000).pipe(switchMap(() => this.loadScore())))
      );
  }

  sendScoreToServer(player: User, points: number) {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'auth-token': player.token,
      'Content-Type': 'application/json',
    });

    const requestBody = {
      name: player.name,
      game: 'race',
      score: points,
    };

    return this._http.post(this.SCORES_URL, requestBody, { headers });
  }
}
