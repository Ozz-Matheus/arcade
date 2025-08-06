// src/scenes/gameover.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.add.image(0, 0, 'background').setOrigin(0, 0);

        SoundManager.playMusic(this, 'gameover-music', { loop: false, volume: 0.6 });

        this.add.text(width / 2, height / 2, Texts.gameOver, {
            fontSize: '64px',
            fontStyle: 'bold',
            fill: '#ff5555',
            fontFamily: 'Verdana',
        }).setOrigin(0.5);

        if (Settings.getPoints() >= Settings.getRecord() * 0.9) {
          this.add.text(width / 2, height / 2 - 100, Texts.almostRecord, {
            fontSize: '24px',
            fill: '#ffff00',
            fontFamily: 'Verdana',
          }).setOrigin(0.5);
        }

        this.input.once('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('mainmenu');
        });
    }
}
