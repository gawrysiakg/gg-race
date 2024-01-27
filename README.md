# GG Race Game - Angular Project

## Project Overview

This project is a simple game application that allows users to log in and play a simple game. Player can check score and view their current gameplay history. It is built using Angular and follows the specified requirements.

##

![gg-game](/src/assets/bg/ggracegame.gif)

## Specification

#### Main Page

The intro page serves as the starting point for users and includes a quick introductory text and a player form. Users must enter their name and email before starting the game( do not register, only enter valid name and email).

- **Components Used:**
  - `AppComponent`: Main component with player data and users list.
  - `PersonFormComponent`: Manages the user input for name and email with ngModel and provides validation feedback.
  - `ScoreComponent`: Takes the usersList as Input and render as a table.

#### Game Page

The game page contains the actual gameplay and includes features such as an exit game button, extended view, dark mode changer and a points counting mechanism. The game itself is implemented using ngx-race library (from https://github.com/chrum/ngx-race).

- **Components Used:**
  - `GameComponent`: Integrates the game library (ngx-race) and manages game-related functionality: points-section (status, points, player name and timer).
  - `NgxRaceComponent`: Main game logic from external library.
  - `ListComponent`: It takes User an Input and displays current player's game history( implemented sorting by status or asc-desc using custom StatusPipe).
  - `GameOverDialogComponent`: Activated after Game Over - End Game or Restart..

## Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `ng serve` to start the development server.
4. Open the application in a web browser.

## Additional Notes

- The project does not use routing but relies on conditional rendering to navigate between pages.
- NgModel is utilized for form management, providing user-friendly validation and error handling.
- The game page integrates the ngx-race game library for an interactive gaming experience.
- My extra points version includes a gameplay history feature with filtering and sorting options.

## Author GG
