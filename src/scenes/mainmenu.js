// src/scenes/mainmenu.js

import { Texts } from '../utils/translations.js';
import { Settings } from '../settings.js';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    create() {

        const { width, height } = this.sys.game.config;

        const scale = this.sys.game.config.width / 800;

        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.add.text(width / 2, height / 2, "Phoenix", {
            fontSize: `${Math.floor(70 * scale)}px`,
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

        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 80, Texts.newGame, {
            fontSize: '30px',
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
            this.sound.stopAll();
            this.scene.start('prelevel');
        });
    }
}
