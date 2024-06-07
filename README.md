# GG Race Game - Angular Project

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb985da2-9e4e-4471-a408-171deba4bc34/deploy-status)](https://app.netlify.com/sites/gawrysiak-race/deploys)

Link to demo: https://gawrysiak-race.netlify.app/

## Project Overview

This project is a simple game application that allows users to log in and play a simple game. Player can check score and view their current gameplay history. Game gets score from external server, and after "game over" - makes post to server to add player score. This game is built using Angular 17 and follows the specified requirements.

##

![gg-game](/src/assets/bg/ggracegame.gif)

## Specification

### App

**Components Used:**

- `AppComponent`: Main component with RouterOutlet.

### Intro Page

The intro page serves as the starting point for users and includes a quick introductory text and a player form. Users must enter their name and userID before starting the game. System makes post to external server to check token, then log in player. Actual score is also retrieved from server.

**Components Used:**

- `AppComponent`: Main component with RouterOutlet.
- `IntroComponent`: Smart component, checking userId on server, retrieving score.
  - `IntroTextComponent`: Top welcome text, dumb component.
  - `PersonFormComponent`: Player form with ngForm provides validation feedback, emiting player as output.
  - `ScoreComponent`: Takes the score$: Observable as Input and render as a table with sorting function (pipe).

### Game Page

The game page contains the actual gameplay and includes features such as an exit game button, extended view, dark mode changer and a points counting mechanism. The game itself is implemented using ngx-race library (from https://github.com/chrum/ngx-race).

**Components Used:**

- `GameComponent`: Integrates the game library (ngx-race) and manages game-related functionality: points-section (status, points, player name and timer).
  - `NgxRaceModule`: Main game logic from external library.
  - `ListComponent`: Dumb component. It takes User as Input and displays current player's game history (sorting by status or asc-desc using custom StatusPipe).
  - `ScoreComponent`: Takes the score$: Observable as Input and render as a table with sorting function (pipe).

## Services

- `PlayerInfoService`: Validate token on server, sets current player
- `ScoreService`: Load score, sends score to server.

## Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `ng serve` to start the development server.
4. Open the application in a web browser.

## Additional Notes

- This project uses routing and http communication.
- NgForm is utilized for form management, providing user-friendly validation and error handling.
- The game page integrates the ngx-race game library for an interactive gaming experience.
- My version includes a gameplay history feature with filtering and sorting options.
- Score component is used in IntroComponent to render top 10 scores for all users, and in GameComponent to render only current player score (using pipe and map from rxjs)

## Recent Updates

- **Route Guard Implementation:** Added a `playerDataGuard` to ensure that users cannot access the game page without proper validation. The guard checks if the user is logged in and has the necessary credentials.
- **Router Configuration:** Updated the router configuration to include the new route guard and handle color parameter changes in the game route.
- **Dynamic Color Change:** Implemented functionality to change the game color based on a URL parameter, enhancing the customization options for the user.

## Author GG
