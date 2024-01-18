import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PersonFormComponent } from '../person-form/person-form.component';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, PersonFormComponent, ScoreComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {


  @Output() public isLoggedIn = new EventEmitter<boolean>();
    public isFormValid=false;

    public showScore=false;
    public scoreButtonText =  "Show score";

  startGame(){
    this.isLoggedIn.emit(true);
    console.log("emit is logged in:")
  }

  validationResult(event: boolean){
    this.isFormValid = event;
  }

  toggleScore(){
    this.scoreButtonText = this.showScore ? "Show score" : "Hide score";
    this.showScore=!this.showScore;
    
  }
}
