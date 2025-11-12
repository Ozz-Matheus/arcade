// src/components/scoreboard.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';

export class ScoreBoard {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const { width, height } = this.relatedScene.scale;
        const fs = Math.max(14, Math.round(height * 0.028)); // ~2.8% del alto

        this.labels = {
            points: this.relatedScene.add.text(20, 10, Texts.score(Settings.getPoints()), {
                fontSize: `${fs}px`,
                fill: '#fff',
                fontFamily: 'Verdana',
                shadow: {
                  offsetX: 1,
                  offsetY: 1,
                  color: '#2ef',
                  blur: 8,
                  fill: true
                }

            }).setDepth(1000),

            level: this.relatedScene.add.text(width / 2, 10, Texts.level(Settings.getLevel()), {
              fontSize: `${fs}px`,
              fill: '#fff',
              fontFamily: 'Verdana',
              shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#2ef',
                blur: 8,
                fill: true
              }
            }).setOrigin(0.5, 0).setDepth(1000),

            record: this.relatedScene.add.text(width - 60, 10, Texts.record(Settings.getRecord()), {
                fontSize: `${fs}px`,
                fill: '#fff',
                fontFamily: 'Verdana',
                shadow: {
                  offsetX: 1,
                  offsetY: 1,
                  color: '#2ef',
                  blur: 8,
                  fill: true
                }

            }).setOrigin(1, 0).setDepth(1000),
        };

        this.relatedScene.scale.on('resize', ({ width: w, height: h }) => {
          const fs2 = Math.max(14, Math.round(h * 0.028));
          this.labels.level.setPosition(w / 2, 10);
          this.labels.points.setFontSize(fs2);
          this.labels.level.setFontSize(fs2);
          this.labels.record.setFontSize(fs2).setPosition(w - 10, 10).setOrigin(1, 0);
        });

    }

    updatePoints(value) {
        this.labels.points.setText(Texts.score(value));
    }

    updateLevel(value) {
        this.labels.level.setText(Texts.level(value));
    }

    updateRecord(value) {
        this.labels.record.setText(Texts.record(value));
    }
}
