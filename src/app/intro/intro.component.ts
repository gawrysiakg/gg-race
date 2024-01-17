import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, PersonFormComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {


  @Output() public isLoggedIn = new EventEmitter<boolean>();


  startGame(){
    this.isLoggedIn.emit(true);
    console.log("emit is logged in:")
  }
}
