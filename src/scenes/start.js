// src/scenes/start.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { loader } from './loader.js';
import { Settings } from '../settings.js';
import { getUIScale } from '../utils/scaling.js';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'start' });
  }

	preload() {
		loader(this);
	}

  create() {

    console.log('config:', this.sys.game.config.width);
    console.log('displaySize:', this.scale.displaySize.width);
    console.log('parentSize:', this.scale.parentSize.width);

    const scale = getUIScale(this);

    const { width, height } = this.sys.game.config;

    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0); // fondo negro

    this.add.text(width / 2, height / 2, Texts.start, {
      fontSize: `${Math.floor(40 * scale)}px`,
      fill: '#ffffff',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#b7b7b7',
        blur: 4,
        fill: true
      }
    }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      Settings.resetGameState();
      SoundManager.playMusic(this, 'bg-music');
      this.scene.start('mainmenu');
    });
  }
}
