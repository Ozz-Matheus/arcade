// src/components/fullscreenbutton.js

export class FullscreenButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    const margin = 16;
    const scale = 0.4;

    const place = () => {
      const { width } = this.relatedScene.scale;
      if (!this.button) {
        this.button = this.relatedScene.add
          .sprite(width - margin, margin, 'fullscreen-button')
          .setInteractive()
          .setScale(scale)
          .setOrigin(1, 0)
          .setFrame(0)
          .setDepth(9999)
          .setScrollFactor(0);

        this.button.on('pointerover', () => this.button.setScale(scale * 1.2));
        this.button.on('pointerout',  () => this.button.setScale(scale));
        this.button.on('pointerdown', () => {
          const sm = this.relatedScene.scale;
          sm.isFullscreen ? sm.stopFullscreen() : sm.startFullscreen();
        });
      } else {
        this.button.setPosition(width - margin, margin);
      }
    };

    place();
    this.relatedScene.scale.on('resize', place);
  }

}
