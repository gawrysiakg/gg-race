import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
import { GameStatus, User } from './models';
import { PersonFormComponent } from './person-form/person-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, GameComponent, ScoreComponent, PersonFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gg-race';

  usersList:Array<User> = [];
  public isGameStarted = false;
  public showScore=false;
  public scoreButtonText =  "Show score";
  public userId =1;
  public player: User | undefined;
  public playerName: string = '';
  public isMainScreen=true;
  public isLoggedIn = false;

  setCurrentPlayer(event: User){
    this.player=event;
    this.player.id=this.userId;
    this.userId++;
    this.playerName=this.player.name;
    this.isLoggedIn=true;
  }
  
  
  startGame(){
    this.isGameStarted=true;
    this.isMainScreen=false;
    this.player?.lastGameHistory.push({gameStatus: GameStatus.READY, date: new Date(), elapsedTime: 0})
  }


  quitGame(event: boolean){
    this.isGameStarted=event;  //event z gry jak skończy grać
    if(this.player){
      const newPlayer: User = { ...this.player };
      this.usersList.push(newPlayer);

    }
    this.isMainScreen=true;
  }


  logout(){
    this.player=undefined;
    this.playerName='';
    this.isLoggedIn=false;
    this.showScore=true;
    this.showScore=false;
  }


  toggleScore(){
    this.scoreButtonText = this.showScore ? "Show score" : "Hide score";
    this.showScore=!this.showScore;
    
  }


  displayScoreAfterGame(){
    this.toggleScore();
    this.isGameStarted=false;
  }

}
