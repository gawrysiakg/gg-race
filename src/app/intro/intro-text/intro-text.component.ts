import { Component, Input } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'app-intro-text',
  standalone: true,
  imports: [],
  templateUrl: './intro-text.component.html',
  styleUrl: './intro-text.component.scss',
})
export class IntroTextComponent {
  @Input() public player: User | undefined;
}
