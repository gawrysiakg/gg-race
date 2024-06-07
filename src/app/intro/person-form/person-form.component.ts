import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
})
export class PersonFormComponent {
  //private _fb = inject(FormBuilder);

  constructor(private _fb: FormBuilder) {
    this.name.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value && +value < 3) {
        console.log(value);
        alert('Your name need to be longer');
      }
    });
  }

  @Output() public currentPlayer = new EventEmitter<User>();

  public get name() {
    return this.userForm.get('name')!;
  }

  public get studentId() {
    return this.userForm.get('studentId')!;
  }

  public userForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    studentId: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
  });

  public submit() {
    const player: User = {
      id: 0,
      name: this.name.getRawValue(),
      email: ' ',
      token: this.studentId.getRawValue(),
      points: 0,
      lastLoggedIn: new Date(),
      lastGameHistory: [],
    };
    this.currentPlayer.emit(player);
  }
}

interface FormData {
  name: string;
  token: string;
}
