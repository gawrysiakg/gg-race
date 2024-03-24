import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private _http: HttpClient) {}

  loadScore(): Observable<Array<Score>> {
    const URL = 'https://scores.chrum.it/scores/race';
    return this._http.get<Array<Score>>(URL, {
      headers: { Accept: 'application/json' },
    });
  }
}
