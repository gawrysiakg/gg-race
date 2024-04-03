import { Component } from '@angular/core';
import { ScoresListItem, User } from '../models';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { ScoreService } from '../score.service';
import { CommonModule } from '@angular/common';
import { MyBestScoresPipe } from './my-best-scores-pipe/my-best-scores.pipe';

@Component({
  selector: 'app-my-scores',
  standalone: true,
  imports: [CommonModule, MyBestScoresPipe],
  templateUrl: './my-scores.component.html',
  styleUrl: './my-scores.component.scss',
})
export class MyScoresComponent {
  public player: User | undefined;
  public score: Array<ScoresListItem> = [];
  usersList: Array<User> = [];
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService,
    private _scoreService: ScoreService
  ) {
    this.player = _playerInfo.getCurrentPlayer;
    this.usersList = _playerInfo.getUsersList;
    this._scoreService.loadScore().subscribe((result) => (this.score = result));
  }

  sortDirection: 'asc' | 'desc' = 'desc';

  handleSortDirectionClick(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
  }
  closeScore() {
    this._router.navigate(['/intro']);
  }
}
