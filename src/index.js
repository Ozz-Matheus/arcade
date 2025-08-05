// src/index.js

import { Game } from './scenes/game.js';
import { MainMenu } from './scenes/mainmenu.js';
import { GameOver } from './scenes/gameover.js';
import { VictoryScreen } from './scenes/victory.js';
import { PreLevelScene } from './scenes/prelevel.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainMenu, PreLevelScene, Game, GameOver, VictoryScreen],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

var game = new Phaser.Game(config);
