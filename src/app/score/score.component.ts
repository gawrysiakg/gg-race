import { Component, Input } from '@angular/core';
import { ScoresListItem, User } from '../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { IntroTextComponent } from '../intro/intro-text/intro-text.component';
import { ScoreService } from '../score.service';
import { BestScorePipe } from './score-pipe/best-score.pipe';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, IntroTextComponent, BestScorePipe],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  public player: User | undefined;
  public score: Array<ScoresListItem> = [];
  usersList: Array<User> = [];
  intervalId: any; //
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService,
    private _scoreService: ScoreService
  ) {
    this.player = _playerInfo.getCurrentPlayer;
    this.usersList = _playerInfo.getUsersList;
    this._scoreService.loadScore().subscribe((result) => (this.score = result));
  }

  ngOnInit(): void {
    this.refreshScoreList();

    this.intervalId = setInterval(() => {
      this.refreshScoreList();
    }, 30000); // 30 sekund (30000 milisekund)
  }

  refreshScoreList() {
    this._scoreService.loadScore().subscribe((result) => (this.score = result));
  }

  sortDirection: 'asc' | 'desc' = 'desc';

  handleSortDirectionClick(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
  }
  closeScore() {
    this._router.navigate(['/intro']);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
