import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent {

  public player: User | undefined;
  @Input() isLoggedIn:boolean=false;
  @Input() loggedInPlayer: User | undefined;
  public name =  '';
  public email = ''; 
  public editing=true;
  //isValid =true
 
 

  
  


  // constructor() {
  //   if(this.loggedInPlayer){
  //     this.name = this.loggedInPlayer?.name;
  //  this.email = this.loggedInPlayer?.email; 
  // }
  //}

 
  @Output() public currentPlayer = new EventEmitter<User>();
 
  edit(){
    this.editing= true;
   // this.isValid=false;
    // if(this.player){
    //    this.name = this.player?.name;
    // this.email = this.player?.email; 
    // }
   

  }
  submit(){
    
    this.player = {
      id: 0,
      name: this.name,
      email: this.email,
      points: 0,
      lastLoggedIn: new Date(),
      lastGameHistory: []
    }
    this.editing = false;
   // this.isValid=true;
    //this.emitValidForm();
    this.currentPlayer.emit(this.player);
    console.log(this.player.name);
    // this.name = '';
    // this.email = ''; 

  }

  
}
