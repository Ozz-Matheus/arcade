// src/components/virtualgamepad.js

import { getBottomOffset } from '../utils/scaling.js';


export class VirtualGamepad {

  constructor(scene) {
    this.scene = scene;
    this.joystick = null;
    this.joystickPad = null;
    this.joystickPointer = null;
    this.center = null;
    this.radius = 50; // se ajusta con el scale dinámico
    this.properties = { inUse: false, left: false, right: false, x: 0 };
  }

  // Igual que FireButton: calcula width/height y usa la misma regla de escala
  create() {
    const width = this.scene.scale.parentSize.width;
    const height = this.scene.scale.parentSize.height;

    const percentage = getBottomOffset(this.scene);

    const scale = width < 500 ? 0.8 : 1.2;

    // offsets simétricos al FireButton (que está en bottom-right)
    const x = 70;                        // margen izquierdo
    const y = height - percentage;      // margen inferior

    this.center = new Phaser.Math.Vector2(x, y);
    this.radius = 50 * scale;

    this.joystick = this.scene.add
      .sprite(x, y, 'virtual-gamepad', 2)
      .setInteractive()
      .setScrollFactor(0)
      .setScale(scale)
      .setDepth(1000);

    this.joystickPad = this.scene.add
      .sprite(x, y, 'virtual-gamepad', 3)
      .setScrollFactor(0)
      .setScale(scale)
      .setDepth(1000);

    // Eventos de input (mismos que ya tenías, pero usando handlers)
    this.scene.input.on('pointerdown', this.onPointerDown, this);
    this.scene.input.on('pointerup', this.onPointerUp, this);
    this.scene.input.on('pointermove', this.onPointerMove, this);
  }

  // Permite recolocar en un resize (opcional pero recomendado)
  reposition() {
    const width = this.scene.scale.parentSize.width;
    const height = this.scene.scale.parentSize.height;
    const scale = width < 500 ? 0.8 : 1.2;

    const percentage = getBottomOffset(this.scene);
    const x = 70;
    const y = height - percentage;

    this.center.set(x, y);
    this.radius = 50 * scale;
    this.joystick.setPosition(x, y).setScale(scale);
    this.joystickPad.setPosition(x, y).setScale(scale);
  }

  onPointerDown(pointer) {
    const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.center.x, this.center.y);
    if (!this.joystickPointer && distance <= this.radius * 2) {
      this.joystickPointer = pointer;
      this.properties.inUse = true;
    }
  }

  onPointerUp(pointer) {
    if (pointer === this.joystickPointer) {
      this.joystickPointer = null;
      this.properties = { inUse: false, left: false, right: false, x: 0 };
      this.joystickPad.setPosition(this.center.x, this.center.y);
    }
  }

  onPointerMove(pointer) {
    if (this.joystickPointer && pointer.id === this.joystickPointer.id) {
      const deltaX = Phaser.Math.Clamp(pointer.x - this.center.x, -this.radius, this.radius);
      this.joystickPad.x = this.center.x + deltaX;

      this.properties.x = Math.floor((deltaX / this.radius) * 100);
      this.properties.left = this.properties.x < -20;
      this.properties.right = this.properties.x > 20;
    }
  }

  getProperties() {
    return this.properties;
  }
}
