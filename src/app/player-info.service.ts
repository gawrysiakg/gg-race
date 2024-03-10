import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  private _usersList: Array<User> = [];
  private _currentPlayer: User | undefined;

  public get getUsersList() {
    return this._usersList;
  }

  public get getCurrentPlayer() {
    return this._currentPlayer;
  }

  public setCurrentPLayer(player: User) {
    this._currentPlayer = player;
  }
}
