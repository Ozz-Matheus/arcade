// src/scenes/mainmenu.js

import { Texts } from '../utils/translations.js';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    create() {

        const { width, height } = this.sys.game.config;

        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.add.text(width / 2, height / 2, "Phoenix", {
            fontSize: '70px',
            fontStyle: 'bold',
            fill: '#ffaa00',
            fontFamily: 'Verdana',
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 80, Texts.start, {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: 'Verdana',
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('prelevel');
        });
    }
}
