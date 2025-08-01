// src/components/livesdisplay.js

import { Settings } from '../settings.js';

export class LivesDisplay {

  static ICON_WIDTH = 28;
  static ICON_HEIGHT = 28;
  static ICON_SPACING = 4;
  static ICON_SCALE = 0.10;

  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    this.livesGroup = this.relatedScene.add.group();

    const startX = 20;
    const y = 45;

    for (let i = 0; i < Settings.getLives(); i++) {
      const x = startX + i * (LivesDisplay.ICON_WIDTH + LivesDisplay.ICON_SPACING);
      const icon = this.relatedScene.add.image(x, y, 'player')
        .setScale(LivesDisplay.ICON_SCALE)
        .setOrigin(0, 0)
        .setAlpha(0.8)
        .setDepth(9999);

      this.livesGroup.add(icon);
    }
  }

  removeOneLife() {
    const remainingLives = this.livesGroup.getChildren();
    if (remainingLives.length > 0) {
      const last = remainingLives[remainingLives.length - 1];
      last.setVisible(false);
    }
  }

  reset() {
    this.livesGroup.clear(true, true);
    this.create();
  }
}
