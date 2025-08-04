// src/components/firebutton.js

export class FireButton {

    constructor(scene) {
        this.scene = scene;
        this.isDown = false;
    }

    create() {
        const width = this.scene.sys.game.config.width;
        const height = this.scene.sys.game.config.height;
        const scale = 1.2;

        this.button = this.scene.add.sprite(width - 100, height - 90, 'virtual-gamepad', 0).setInteractive();
        this.button.setScale(scale);
        this.button.setDepth(1000);

        this.button.on('pointerdown', () => {
            this.isDown = true;
            this.button.setFrame(1); // frame presionado
        });

        this.button.on('pointerup', () => {
            this.isDown = false;
            this.button.setFrame(0);
        });

        this.button.on('pointerout', () => {
            this.isDown = false;
            this.button.setFrame(0);
        });
    }
}
