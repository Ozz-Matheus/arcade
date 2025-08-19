// src/index.js

import { Game } from './scenes/game.js';
import { MainMenu } from './scenes/mainmenu.js';
import { GameOver } from './scenes/gameover.js';
import { VictoryScreen } from './scenes/victory.js';
import { PreLevelScene } from './scenes/prelevel.js';
import { EnemyIntroScene } from './scenes/enemyintro.js';
import { LevelPassedScene } from './scenes/levelpassed.js';
import { StartScene } from './scenes/start.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [
    StartScene,
    MainMenu,
    PreLevelScene,
    EnemyIntroScene,
    Game,
    GameOver,
    VictoryScreen,
    LevelPassedScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#000'
};

var game = new Phaser.Game(config);
