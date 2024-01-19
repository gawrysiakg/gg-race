import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
  public id= 0;
  //public loggedInDate:Date = new Date();

  public player: User | undefined;

  // @Output() public isFormValid = new EventEmitter<boolean>();
  @Output() public currentPlayer = new EventEmitter<User>();

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
    //this.emitValidForm();
  }
  submit(){
    this.player = {
      id: this.id+1,
      name: this.name,
      email: this.email,
      points: 0,
      lastLoggedIn: new Date()
    }
    this.editing = false;
    this.isValid=true;
    //this.emitValidForm();
    this.currentPlayer.emit(this.player);
    console.log(this.player.name)
  }
}
