// src/scenes/levelpassed.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { loader } from './loader.js';
import { Settings } from '../settings.js';
import { Stars } from '../components/stars.js';
import { getUIScale } from '../utils/scaling.js';

export class LevelPassedScene extends Phaser.Scene {
  constructor() {
    super({ key: 'levelpassed' });
  }

  init() {
    this.stars = new Stars(this);
  }

  create() {
    const { width, height } = this.sys.game.config;

    const scale = getUIScale(this);

    this.add.image(0, 0, 'background').setOrigin(0, 0);

    SoundManager.playMusic(this, 'level-passed', { loop: false, volume: 0.6 });

    this.stars.create();

    const title = this.add.text(width / 2, height / 3, Texts.levelPassed, {
      fontSize: `${Math.floor(60 * scale)}px`,
      fontStyle: 'bold',
      fill: '#00b83f',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#006a00',
        blur: 6,
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
      this.sound.stopAll();
      this.scene.start('prelevel');
    });
  }

  update() {
    this.stars.update();
  }
}
