// src/components/firebutton.js

export class FireButton {

    constructor(scene) {
        this.scene = scene;
        this.isDown = false;
    }

    create() {

        const width = this.scene.scale.parentSize.width;

        const height = this.scene.scale.parentSize.height;

        const percentage = height * 0.20;   // 20%

        const scale = width < 500 ? 0.8 : 1.2;

        this.button = this.scene.add.sprite(
            width - 50,                // margen izquierdo
            height - percentage,       // margen inferior
            'virtual-gamepad', 0
        ).setInteractive();

        this.button.setScale(scale);
        this.button.setDepth(1000);

        this.button.on('pointerdown', () => {
            this.isDown = true;
            this.button.setFrame(1);
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
