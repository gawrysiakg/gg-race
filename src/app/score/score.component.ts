import { Component, Input } from '@angular/core';
import { ScoresListItem, User } from '../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';
import { IntroTextComponent } from '../intro/intro-text/intro-text.component';
import { ScoreService } from '../score.service';
import { BestScorePipe } from './score-pipe/best-score.pipe';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, IntroTextComponent, BestScorePipe],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  //@Input() public score: Array<ScoresListItem> = [];
  @Input() public score$: Observable<ScoresListItem[]> = of([]); // Observable emitujący pustą tablicę
  public constructor() {}
  sortDirection: 'asc' | 'desc' = 'desc';

  handleSortDirectionClick(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
  }
}
