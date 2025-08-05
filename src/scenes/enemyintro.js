// src/scenes/enemyintro.js

import { Stars } from '../components/stars.js';
import { Enemies } from '../components/enemies.js';
import { ScoreBoard } from '../components/scoreboard.js';
import { Settings } from '../settings.js';

export class EnemyIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'enemyintro' });
  }

  init() {
    this.stars = new Stars(this);
    this.enemies = new Enemies(this);
    this.scoreboard = new ScoreBoard(this);
  }

  create() {
    const { width, height } = this.sys.game.config;

    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.stars.create();
    this.enemies.create();
    this.scoreboard.create();

    const message = this.add.text(width / 2, height / 1.4, 'Preparado...', {
      fontSize: '32px',
      fill: '#7f1',
      fontFamily: 'Verdana',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#2f9',
        blur: 9,
        fill: true
      }
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: message,
      alpha: 1,
      yoyo: true,
      duration: 2000
    });

    // Fade in de enemigos descendiendo
    this.tweens.add({
      targets: this.enemies.get().getChildren(),
      alpha: 1,
      delay: 1000,
      duration: 3000
    });

    this.tweens.add({
      targets: this.enemies.get().getChildren(),
      y: `-=${height / 2}`,
      ease: 'Sine.easeIn',
      duration: 2400,
      yoyo: true
    });

    this.time.delayedCall(5000, () => {
      this.scene.start('game');
    });
  }

  update() {
    this.stars.update();
  }
}
