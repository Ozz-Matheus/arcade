// src/components/fullscreenbutton.js

export class FullscreenButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    const width = this.relatedScene.sys.game.config.width;
    const scale = 0.4;
    const margin = 20;

    this.button = this.relatedScene.add.sprite(width - margin, margin, 'fullscreen-button')
      .setInteractive()
      .setScale(scale)
      .setOrigin(0.5)
      .setFrame(0)
      .setDepth(9999);

    this.button.on('pointerover', () => {
      this.button.setScale(scale * 1.3);
    });

    this.button.on('pointerout', () => {
      this.button.setScale(scale);
    });

    this.button.on('pointerdown', () => {
      const scaleManager = this.relatedScene.scale;
      if (!scaleManager.isFullscreen) {
        scaleManager.startFullscreen();
      } else {
        scaleManager.stopFullscreen();
      }
    });
  }
}
