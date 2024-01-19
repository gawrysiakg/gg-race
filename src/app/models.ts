export interface User {
    id: number;
    name: string;
    email: string;
    points: number;
    lastLoggedIn: Date;
  }


  export enum GameStatus {
    READY = 'READY',
    STARTED = 'STARTED',
    PAUSED = 'PAUSED',
    FINISHED = 'FINISHED',
    RESETED = 'RESETED'
  }