// src/components/virtualgamepad.js

import { hudLayout } from '../utils/hudLayout.js';

export class VirtualGamepad {
  constructor(scene) {
    this.scene = scene;
    this.joystick = null;
    this.joystickPad = null;
    this.joystickPointer = null;
    this.radius = 50;
    this.properties = { inUse: false, left: false, right: false, x: 0 };
    this.center = new Phaser.Math.Vector2(0, 0);
    this._onResize = null;
  }

  setCenter(x, y) {
    this.center.set(x, y);
    if (this.joystick)    this.joystick.setPosition(x, y);
    if (this.joystickPad) this.joystickPad.setPosition(x, y);
  }

  createJoystick(/* x, y, scale */) {
    const { leftPad, scale } = hudLayout(this.scene);

    this.radius = 40 * scale;
    this.center.set(leftPad.x, leftPad.y);

    this.joystick = this.scene.add.sprite(leftPad.x, leftPad.y, 'virtual-gamepad', 2)
      .setInteractive()
      .setScrollFactor(0)
      .setScale(scale)
      .setDepth(1000);

    this.joystickPad = this.scene.add.sprite(leftPad.x, leftPad.y, 'virtual-gamepad', 3)
      .setScrollFactor(0)
      .setScale(scale)
      .setDepth(1000);

    // Tus listeners actuales:
    this.scene.input.on('pointerdown', (pointer) => {
      if (!this.joystickPointer &&
          Phaser.Math.Distance.Between(pointer.x, pointer.y, this.center.x, this.center.y) <= this.radius * 2) {
        this.joystickPointer = pointer;
        this.properties.inUse = true;
      }
    }, this);

    this.scene.input.on('pointerup', this.onPointerUp, this);
    this.scene.input.on('pointermove', this.onPointerMove, this);

    // Reposicionar/reescalar al cambiar tamaño
    if (!this._onResize) {
      this._onResize = () => {
        const { leftPad, scale } = hudLayout(this.scene);
        this.radius = 40 * scale;
        this.setCenter(leftPad.x, leftPad.y);
        if (this.joystick)    this.joystick.setScale(scale);
        if (this.joystickPad) this.joystickPad.setScale(scale);
      };
      this.scene.scale.on('resize', this._onResize);
      this.scene.events.once('shutdown', () => {
        this.scene.scale.off('resize', this._onResize);
        this._onResize = null;
      });
    }
  }

  onPointerUp(pointer) {
    if (pointer === this.joystickPointer) {
      this.joystickPointer = null;
      this.properties = { inUse: false, left: false, right: false, x: 0 };
      if (this.joystickPad) this.joystickPad.setPosition(this.center.x, this.center.y);
    }
  }

  onPointerMove(pointer) {
    if (this.joystickPointer && pointer.id === this.joystickPointer.id) {
      const deltaX = Phaser.Math.Clamp(pointer.x - this.center.x, -this.radius, this.radius);
      if (this.joystickPad) {
        this.joystickPad.x = this.center.x + deltaX;
        this.joystickPad.y = this.center.y; // fija Y
      }
      this.properties.x = Math.floor((deltaX / this.radius) * 100);
      this.properties.left  = this.properties.x < -20;
      this.properties.right = this.properties.x > 20;
    }
  }

  getProperties() {
    return this.properties;
  }
}
