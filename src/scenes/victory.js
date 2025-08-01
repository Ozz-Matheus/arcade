// src/scenes/victory.js

import { Texts } from '../utils/translations.js';

export class VictoryScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'victory' });
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.add.text(width / 2, height / 2, Texts.victory, {
            fontSize: '64px',
            fontStyle: 'bold',
            fill: '#55ff55',
            fontFamily: 'Verdana',
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('mainmenu');
        });
    }
}
