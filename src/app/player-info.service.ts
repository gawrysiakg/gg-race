import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  private _usersList: Array<User> = [];
  private _currentPlayer: User | undefined;
  public userId = 1;

  public get getUsersList() {
    return this._usersList;
  }

  public get getCurrentPlayer() {
    return this._currentPlayer;
  }

  public setCurrentPLayer(player: User | undefined) {
    this._currentPlayer = player;

    if (player) {
      player.id = this.userId;
      //  this._usersList = [...this._usersList, { ...player }];
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
