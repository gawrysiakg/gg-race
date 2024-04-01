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

  // public validateToken(token: string): Observable<boolean> {
  //   const URL = 'https://scores.chrum.it/check-token';
  //   return new Observable<boolean>((observer) => {
  //     this._http
  //       .post<TokenDto>(
  //         URL,
  //         { 'auth-token': token },
  //         { headers: { 'Content-Type': 'application/json' } }
  //       )
  //       .subscribe(
  //         (result) => {
  //           this.isAuthenticated = result.auth_token;
  //           observer.next(this.isAuthenticated);
  //           observer.complete();
  //           console.log(this.isAuthenticated);
  //         },
  //         (error) => {
  //           observer.error(error);
  //         }
  //       );
  //   });
  // }

  public validateToken(token: string) {
    const URL = 'https://scores.chrum.it/check-token';

    return this._http.post<AuthTokenResponse>(
      URL,
      { 'auth-token': token },
      { headers: { 'Content-Type': 'application/json' } }
    );
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

  public get getUsersList() {
    return this._usersList;
  }

  public get isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  public get getCurrentPlayer() {
    return this._currentPlayer;
    // return this._currentPlayer || ({} as User);
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
