import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoresListItem } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private _http: HttpClient) {}

  loadScore(): Observable<Array<ScoresListItem>> {
    const URL = 'https://scores.chrum.it/scores/race';
    return this._http.get<Array<ScoresListItem>>(URL, {
      headers: { Accept: 'application/json' },
    });
  }
}
