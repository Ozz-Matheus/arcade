// src/index.js

import { Game } from './scenes/game.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height:600,
  scene: [Game],
  physics: {
    default:'arcade',
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

}


var game = new Phaser.Game(config);