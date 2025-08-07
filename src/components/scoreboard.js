// src/components/scoreboard.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { getUIScale } from '../utils/scaling.js';

export class ScoreBoard {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const { width } = this.relatedScene.sys.game.config;

        const scale = getUIScale(this);

        this.labels = {
            points: this.relatedScene.add.text(20, 10, Texts.score(Settings.getPoints()), {
                fontSize: `${Math.floor(20 * scale)}px`,
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
              fontSize: `${Math.floor(20 * scale)}px`,
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
                fontSize: `${Math.floor(20 * scale)}px`,
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
