export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  lastLoggedIn: Date;
  lastGameHistory: Array<GameHistory>;
}

export interface GameHistory {
  gameStatus: GameStatus;
  date: Date;
  elapsedTime: number;
}

export enum GameStatus {
  READY = 'READY',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  RESETED = 'RESETED',
  GAME_OVER = 'GAME OVER',
  QUIT_GAME = 'QUIT GAME',
  OVERTAKING = 'OVERTAKING',
  TURBO_ON = 'TURBO ON',
  TURBO_OFF = 'TURBO OFF',
  DARK_MODE_ON = 'DARK MODE',
  DARK_MODE_OFF = 'LIGHT MODE',
  SIMPLE_VIEW = 'SIMPLE VIEW',
  EXTENDED_VIEW = 'EXTENDED VIEW',
}

export interface Score {
  name: string;
  score: number;
}
