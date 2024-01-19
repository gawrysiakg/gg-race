import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GameComponent } from './game/game.component';
import { IntroComponent } from './intro/intro.component';
import { ScoreComponent } from './score/score.component';
import { User } from './models';
import { PersonFormComponent } from './person-form/person-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, IntroComponent, GameComponent, ScoreComponent, PersonFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gg-race';

  public isLoggedIn = false;
  isGameOver = false;
  public showScore=false;
  public isFormValid=false;
  public scoreButtonText =  "Show score";
 
  public player: User | undefined;
   


  setCurrentPlayer(event: User){
    this.player=event;
  }
  validationResult(event: boolean){
    this.isFormValid = event;
  }
  logIn(event: boolean){
    this.isLoggedIn=event;
  }

  startGame(){
    this.isLoggedIn=true;
  }


  quitGame(event: boolean){
    this.isLoggedIn=event;
    if(this.player){
       this.usersList.push(this.player)
    }
  }

  toggleScore(){
    this.scoreButtonText = this.showScore ? "Show score" : "Hide score";
    this.showScore=!this.showScore;
    
  }



  usersList:Array<User> = [{
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    points: 100,
    lastLoggedIn: new Date('2024-01-18T12:00:00Z'),
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    points: 150,
    lastLoggedIn: new Date('2024-01-17T15:30:00Z'),
  },
  {
    id: 3,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    points: 75,
    lastLoggedIn: new Date('2024-01-16T10:45:00Z'),
  },
  {
    id: 4,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    points: 200,
    lastLoggedIn: new Date('2024-01-15T08:20:00Z'),
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    points: 50,
    lastLoggedIn: new Date('2024-01-14T18:00:00Z'),
  },]
}
