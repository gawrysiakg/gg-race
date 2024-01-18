import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  @Output() public isFormValid = new EventEmitter<boolean>();

  emitValidForm(){
    if(this.isValid){
      this.isFormValid.emit(true);
  } else {
    this.isFormValid.emit(false);
  }
    }
    
  edit(){
    this.editing= true;
    this.isValid=false;
    this.emitValidForm();
  }
  submit(){
    this.editing = false;
    this.isValid=true;
    this.emitValidForm();
  }
}
