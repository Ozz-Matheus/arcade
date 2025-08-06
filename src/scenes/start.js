// src/scenes/start.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { loader } from './loader.js';
import { Settings } from '../settings.js';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'start' });
  }

	preload() {
		loader(this);
	}

  create() {
    const { width, height } = this.sys.game.config;

    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0); // fondo negro

    this.add.text(width / 2, height / 2, Texts.start, {
      fontSize: '40px',
      fill: '#ffffaa',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#ffffff',
        blur: 7,
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
