import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoresListItem, User } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private SCORES_URL = 'https://scores.chrum.it/scores';
  constructor(private _http: HttpClient) {}

  loadScore(): Observable<Array<ScoresListItem>> {
    const URL = 'https://scores.chrum.it/scores/race';
    return this._http.get<Array<ScoresListItem>>(URL, {
      headers: { Accept: 'application/json' },
    });
  }
  sendScoreToServer(player: User, points: number) {
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer ' + player.token,
    //   'Content-Type': 'application/json',
    // });
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
