import { Component, Input } from '@angular/core';
import { User } from '../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  public constructor(
    private _router: Router,
    private _playerInfo: PlayerInfoService
  ) {}

  @Input() usersList: Array<User> = [];

  closeScore() {
    this._router.navigate(['/intro']);
  }
}
