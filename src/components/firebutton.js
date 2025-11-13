// src/components/firebutton.js

export class FireButton {

    constructor(scene) {
        this.scene = scene;
        this.isDown = false;
    }

    create() {
      const scale = 0.95;
      const margin = 18;

      const place = () => {
        const { width, height } = this.scene.scale;
        if (!this.button) {
          this.button = this.scene.add
            .sprite(width - margin, height - margin, 'virtual-gamepad', 0)
            .setInteractive()
            .setScale(scale)
            .setOrigin(1, 1)
            .setDepth(1000)
            .setScrollFactor(0);

          this.button.on('pointerdown', () => { this.isDown = true; this.button.setFrame(1); });
          this.button.on('pointerup',   () => { this.isDown = false; this.button.setFrame(0); });
          this.button.on('pointerout',  () => { this.isDown = false; this.button.setFrame(0); });
        } else {
          this.button.setPosition(width - margin, height - margin);
        }
      };

      place();
      this.scene.scale.on('resize', place);
    }
}
