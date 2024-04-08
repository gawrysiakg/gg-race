import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoresListItem, User } from './models';
import {
  Observable,
  concatWith,
  interval,
  pipe,
  repeatWhen,
  retryWhen,
  shareReplay,
  startWith,
  switchMap,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private POST_SCORE_URL = 'https://scores.chrum.it/scores';
  //private POST_SCORE_URL = 'http://localhost:8080/scores';

  private URL = 'https://scores.chrum.it/scores/race';
  //private URL = 'http://localhost:8080/scores/race';

  constructor(private _http: HttpClient) {}

  // pierwsze score za 30 s
  loadScore3(): Observable<Array<ScoresListItem>> {
    return this._http
      .get<Array<ScoresListItem>>(this.URL, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        switchMap(() => interval(30000)),
        switchMap(() =>
          this._http.get<Array<ScoresListItem>>(this.URL, {
            headers: { Accept: 'application/json' },
          })
        )
      );
  }

  loadScore2(): Observable<Array<ScoresListItem>> {
    return this._http
      .get<Array<ScoresListItem>>(this.URL, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        // Use `shareReplay(1)` to share the latest emitted value with all subscribers.
        shareReplay(1),
        concatWith(
          interval(30000).pipe(
            switchMap(() =>
              this._http.get<Array<ScoresListItem>>(this.URL, {
                headers: { Accept: 'application/json' },
              })
            )
          )
        )
      );
  }

  // lepiej:
  loadScore(): Observable<Array<ScoresListItem>> {
    return this._http
      .get<Array<ScoresListItem>>(this.URL, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        switchMap((data) =>
          timer(0, 30000).pipe(
            switchMap(() =>
              this._http.get<Array<ScoresListItem>>(this.URL, {
                headers: { Accept: 'application/json' },
              })
            )
          )
        )
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

    return this._http.post(this.POST_SCORE_URL, requestBody, { headers });
  }
}
