// src/components/scoreboard.js

import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';

export class ScoreBoard {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        const { width } = this.relatedScene.sys.game.config;

        this.labels = {
            points: this.relatedScene.add.text(20, 10, Texts.score(Settings.getPoints()), {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Verdana'
            }),

            level: this.relatedScene.add.text(width / 2, 10, Texts.level(Settings.getLevel()), {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Verdana'
            }).setOrigin(0.5, 0),

            record: this.relatedScene.add.text(width - 20, 10, Texts.record(Settings.getRecord()), {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Verdana'
            }).setOrigin(1, 0),
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
