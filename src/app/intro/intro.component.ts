import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PersonFormComponent } from '../person-form/person-form.component';
import { ScoreComponent } from '../score/score.component';
import { User } from '../models';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, PersonFormComponent, ScoreComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {


  @Output() public isLoggedIn = new EventEmitter<boolean>();
  

    

   // usersList:Array<User> = [];

  
 

 

  // usersList:Array<User> = [{
  //   id: 1,
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   points: 100,
  //   lastLoggedIn: new Date('2024-01-18T12:00:00Z'),
  // },
  // {
  //   id: 2,
  //   name: 'Jane Doe',
  //   email: 'jane.doe@example.com',
  //   points: 150,
  //   lastLoggedIn: new Date('2024-01-17T15:30:00Z'),
  // },
  // {
  //   id: 3,
  //   name: 'Bob Smith',
  //   email: 'bob.smith@example.com',
  //   points: 75,
  //   lastLoggedIn: new Date('2024-01-16T10:45:00Z'),
  // },
  // {
  //   id: 4,
  //   name: 'Alice Johnson',
  //   email: 'alice.johnson@example.com',
  //   points: 200,
  //   lastLoggedIn: new Date('2024-01-15T08:20:00Z'),
  // },
  // {
  //   id: 5,
  //   name: 'Charlie Brown',
  //   email: 'charlie.brown@example.com',
  //   points: 50,
  //   lastLoggedIn: new Date('2024-01-14T18:00:00Z'),
  // },]
}
