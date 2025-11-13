// src/components/player.js

import { hudLayout } from '../utils/hudLayout.js';

export class Player {
  static SPEED_ON_THE_X_AXIS = 520;
  static ACCELERATION_ON_THE_X_AXIS = 500;
  static SPEED_ON_THE_Y_AXIS = 0;

  constructor(scene) { this.relatedScene = scene; }

  create() {
    const W = this.relatedScene.scale.width;
    const H = this.relatedScene.scale.height;
    const { padSize } = hudLayout(this.relatedScene);

    const INITIAL_POSITION_IN_X = Math.floor(W / 2);
    // Nave siempre encima de los controles (≈ 12px de aire)
    const INITIAL_POSITION_IN_Y = Math.max(
      Math.floor(H * 0.82),
      H - (padSize + 12)
    );

    this.player = this.relatedScene.physics.add.sprite(
      INITIAL_POSITION_IN_X,
      INITIAL_POSITION_IN_Y,
      'player'
    );
    this.player.setScale(0.4, 0.4);

    this.player.setData('posIni', [INITIAL_POSITION_IN_X, INITIAL_POSITION_IN_Y]);
    this.player.setData('vel-x', Player.SPEED_ON_THE_X_AXIS);
    this.player.setData('acel-x', Player.ACCELERATION_ON_THE_X_AXIS);
    this.player.setData('vel-y', Player.SPEED_ON_THE_Y_AXIS);

    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    this.controls = this.relatedScene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.controls.left.isDown || this.relatedScene.dpadLeft?.isDown) {
      this.player.setVelocityX(-this.player.getData('vel-x'));
    } else if (this.controls.right.isDown || this.relatedScene.dpadRight?.isDown) {
      this.player.setVelocityX(this.player.getData('vel-x'));
    } else {
      this.player.setVelocityX(0);
    }
  }

  get() { return this.player; }
}
