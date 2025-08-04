// src/components/virtualgamepad.js

export class VirtualGamepad {
    constructor(scene) {
        this.scene = scene;
        this.joystick = null;
        this.joystickPad = null;
        this.joystickPointer = null;
        this.radius = 50;
        this.properties = {
            inUse: false,
            left: false,
            right: false,
            x: 0,
        };
    }

    createJoystick(x, y, scale = 1) {
        this.center = new Phaser.Math.Vector2(x, y);

        this.joystick = this.scene.add.sprite(x, y, 'virtual-gamepad', 2)
            .setInteractive()
            .setScrollFactor(0)
            .setScale(scale)
            .setDepth(1000);
        this.joystickPad = this.scene.add.sprite(x, y, 'virtual-gamepad', 3)
            .setScrollFactor(0)
            .setScale(scale)
            .setDepth(1000);

        this.scene.input.on('pointerdown', (pointer) => {
            if (!this.joystickPointer && Phaser.Math.Distance.Between(pointer.x, pointer.y, this.center.x, this.center.y) <= this.radius * 2) {
                this.joystickPointer = pointer;
                this.properties.inUse = true;
            }
        }, this);

        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
    }

    onPointerDown(pointer) {
        const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.center.x, this.center.y);
        if (distance <= this.radius * 2) {
            this.joystickPointer = pointer;
            this.properties.inUse = true;
        }
    }

    onPointerUp(pointer) {
        if (pointer === this.joystickPointer) {
            this.joystickPointer = null;
            this.properties = {
                inUse: false,
                left: false,
                right: false,
                x: 0
            };
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
