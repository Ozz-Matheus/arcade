// src/scenes/levelpassed.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { Stars } from '../components/stars.js';

export class LevelPassedScene extends Phaser.Scene {
  constructor() {
    super({ key: 'levelpassed' });
  }

  init() {
    this.stars = new Stars(this);
  }

  create() {
    const { width, height } = this.sys.game.config;

    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.stars.create();

    const title = this.add.text(width / 2, height / 3, Texts.levelPassed, {
      fontSize: '60px',
      fontStyle: 'bold',
      fill: '#ffff66',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#fa1',
        blur: 15,
        fill: true
      }
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: title,
      alpha: 1,
      yoyo: true,
      duration: 1500
    });

    // Subir de nivel
    Settings.setLevel(Settings.getLevel() + 1);

    this.time.delayedCall(3500, () => {
      this.scene.start('prelevel');
    });
  }

  update() {
    this.stars.update();
  }
}
