import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
})
export class PersonFormComponent {
  @Output() public currentPlayer = new EventEmitter<User>();
  @Input() isLoggedIn: boolean = true;
  public player: User | undefined;

  public submit(form: FormData) {
    this.player = {
      id: 0,
      name: form.name,
      email: form.email,
      points: 0,
      lastLoggedIn: new Date(),
      lastGameHistory: [],
    };
    this.currentPlayer.emit(this.player);
    this.player = undefined;
  }
}

interface FormData {
  name: string;
  email: string;
}
