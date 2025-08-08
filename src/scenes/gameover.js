// src/scenes/gameover.js

import { SoundManager } from '../utils/soundManager.js';
import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';
import { getUIScale } from '../utils/scaling.js';

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
    }

    create() {
        const { width, height } = this.scale.parentSize;

        const scale = getUIScale(this);

        this.background = this.add.tileSprite(0, 0, this.scale.parentSize.width, this.scale.parentSize.height, 'background').setOrigin(0, 0);

        SoundManager.playMusic(this, 'gameover-music', { loop: false, volume: 0.6 });

        this.add.text(width / 2, height / 2, Texts.gameOver, {
            fontSize: `${Math.floor(64 * scale)}px`,
            fontStyle: 'bold',
            fill: '#fd2727',
            fontFamily: 'Verdana',
            shadow: {
              offsetX: 1,
              offsetY: 1,
              color: '#F44336',
              blur: 4,
              fill: true
            }
        }).setOrigin(0.5);

        if (Settings.getPoints() >= Settings.getRecord() * 0.9) {
          this.add.text(width / 2, height / 2 - 60, Texts.almostRecord, {
            fontSize: `${Math.floor(24 * scale)}px`,
            fill: '#00b83f',
            fontFamily: 'Verdana',
            shadow: {
              offsetX: 1,
              offsetY: 1,
              color: '#006a00',
              blur: 6,
              fill: true
            }
          }).setOrigin(0.5);
        }

        this.input.once('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('mainmenu');
        });
    }
}
