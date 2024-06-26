import { Injectable } from '@angular/core';
import { AuthTokenResponse, User } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  private _usersList: Array<User> = [];
  private _currentPlayer: User | undefined;
  public userId = 1;
  public isAuthenticated = false;

  constructor(private _http: HttpClient) {}

  public validateToken(token: string) {
    //const URL = 'http://localhost:8080/check-token';
    const URL = 'https://scores.chrum.it/check-token';

    return this._http.post<AuthTokenResponse>(
      URL,
      { 'auth-token': token },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  public get getUsersList() {
    return this._usersList;
  }

  public get isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  public get getCurrentPlayer() {
    const player = localStorage.getItem('currentPlayer');
    console.log(' get current player', player);
    return JSON.parse(player!);
  }

  public setCurrentPLayer(player: User | undefined) {
    this._currentPlayer = player;

    if (player) {
      player.id = this.userId;
      this._usersList.push({ ...player });
      localStorage.setItem('currentPlayer', JSON.stringify(player));
      console.log(' set current player', JSON.stringify(player));
    }
    this.userId++;
  }

  public removeCurrentPLayer() {
    this._currentPlayer = undefined;
    localStorage.removeItem('currentPlayer');
    console.log('removed current player');
  }

  public updatePlayer(player: User) {
    const playerIndex = this._usersList.findIndex(
      (user) => user.id === player.id
    );
    localStorage.setItem('currentPlayer', JSON.stringify(player));
    if (playerIndex !== -1) {
      this._usersList[playerIndex] = player;
    } else {
      this._usersList.push(player);
    }
  }
}
