import { Component, Input } from '@angular/core';
import { User } from '../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { IntroTextComponent } from '../intro/intro-text/intro-text.component';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, IntroTextComponent],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  public player: User | undefined;
  usersList: Array<User> = [];
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService
  ) {
    this.player = _playerInfo.getCurrentPlayer;
    this.usersList = _playerInfo.getUsersList;
  }

  closeScore() {
    this._router.navigate(['/intro']);
  }
}
