// src/scenes/enemyintro.js

import { Texts } from '../utils/translations.js';
import { getUIScale } from '../utils/scaling.js';

export class EnemyIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'enemyintro' });
  }

  create() {
    const { width, height } = this.sys.game.config;

    const scale = getUIScale(this);

    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

    const message = this.add.text(width / 2, height / 1.4, Texts.loading, {
      fontSize: `${Math.floor(32 * scale)}px`,
      fill: '#25d366',
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
      targets: message,
      alpha: 1,
      yoyo: true,
      duration: 2000
    });

    this.time.delayedCall(5000, () => {
      this.scene.start('game');
    });

  }
}
