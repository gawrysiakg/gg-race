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
  public name = '';
  public email = ''; 
  public editing=true;
  isValid =true// this.name || this.email;
  // public id= 0;
  //public loggedInDate:Date = new Date();

  public player: User | undefined;
  

  // @Output() public isFormValid = new EventEmitter<boolean>();
  @Output() public currentPlayer = new EventEmitter<User>();
  // public lastUserId = 0;

  // emitValidForm(){
  //   if(this.isValid){
  //     this.isFormValid.emit(true);
  // } else {
  //   this.isFormValid.emit(false);
  // }
  //   }
    
  edit(){
    this.editing= true;
    this.isValid=false;
    if(this.player){
       this.name = this.player?.name;
    this.email = this.player?.email; 
    }
   
    //this.emitValidForm();
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
    this.isValid=true;
    //this.emitValidForm();
    this.currentPlayer.emit(this.player);
    console.log(this.player.name);
    // this.name = '';
    // this.email = ''; 

  }
}
