// src/scenes/victory.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';

export class VictoryScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'victory' });
    }

  create() {
    const { width, height } = this.sys.game.config;

    this.add.image(0, 0, 'background').setOrigin(0, 0);
    SoundManager.playMusic(this, 'victory-music', { loop: false, volume: 0.6 });

    this.add.text(width / 2, height / 3, Texts.victory, {
      fontSize: '64px',
      fontStyle: 'bold',
      fill: '#55ff55',
      fontFamily: 'Verdana',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, Texts.score(Settings.getPoints()), {
      fontSize: '28px',
      fill: '#ffffff',
      fontFamily: 'Verdana',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 50, Texts.record(Settings.getRecord()), {
      fontSize: '24px',
      fill: '#cccccc',
      fontFamily: 'Verdana',
    }).setOrigin(0.5);


    if (Settings.getPoints() >= Settings.getRecord()) {
      Settings.setRecord(Settings.getPoints());
      this.add.text(width / 2, height / 2 - 100, Texts.newRecord, {
        fontSize: '32px',
        fill: '#ff0',
        fontFamily: 'Verdana',
      }).setOrigin(0.5);
    }

    this.input.once('pointerdown', () => {
      this.sound.stopAll();
      this.scene.start('mainmenu');
    });
  }

}
