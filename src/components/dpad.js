// src/components/dpad.js

export class DPad {

    constructor(scene, config) {
        this.scene = scene;
        this.config = config;
        this.isDown = false;
    }

    create() {
        const height = this.scene.sys.game.config.height;
        this.button = this.scene.add.image(this.config.x, height - this.config.y, this.config.key).setInteractive();
        this.button.setScale(2.7);

        this.button.on('pointerdown', () => this.isDown = true);
        this.button.on('pointerup', () => this.isDown = false);
    }
}
