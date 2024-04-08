import { Injectable } from '@angular/core';
import { AuthTokenResponse, User } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this._currentPlayer;
  }

  public setCurrentPLayer(player: User | undefined) {
    this._currentPlayer = player;

    if (player) {
      player.id = this.userId;
      this._usersList.push({ ...player });
    }
    this.userId++;
  }

  public removeCurrentPLayer() {
    this._currentPlayer = undefined;
  }

  public updatePlayer(player: User) {
    const playerIndex = this._usersList.findIndex(
      (user) => user.id === player.id
    );

    if (playerIndex !== -1) {
      this._usersList[playerIndex] = player;
    } else {
      this._usersList.push(player);
    }
  }
}

// public validateToken(token: string): boolean {
//   const URL = 'https://scores.chrum.it/check-token';

//   this._http
//     .post<TokenDto>(
//       URL,
//       { 'auth-token': token },
//       { headers: { 'Content-Type': 'application/json' } }
//     )
//     .subscribe((result) => {
//       this.isAuthenticated = result.success;

//       console.log(this.isAuthenticated);
//     });
//   return this.isAuthenticated;
// }
