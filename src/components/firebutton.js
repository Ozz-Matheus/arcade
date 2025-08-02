// src/components/firebutton.js

export class FireButton {

    constructor(scene) {
        this.scene = scene;
        this.isDown = false;
    }

    create() {
        const width = this.scene.sys.game.config.width;
        const height = this.scene.sys.game.config.height;

        this.button = this.scene.add.image(width - 100, height - 90, 'fire-button').setInteractive();
        this.button.setScale(2.3);

        this.button.on('pointerdown', () => this.isDown = true);
        this.button.on('pointerup', () => this.isDown = false);
    }
}
