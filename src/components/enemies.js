// src/components/enemies.js

import { Settings } from '../settings.js';


/* ------------------------------------------------------------------------------------------ */

export class Enemies {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        const level = this.relatedScene.registry.get('level') || 1;
        const screenWidth = this.relatedScene.scale.parentSize.width;
        const screenHeight = this.relatedScene.scale.parentSize.height;

        // Calculamos columnas seguras según ancho de pantalla
        const maxColumns = Math.floor(screenWidth / 64); // cada enemigo ocupa 64px

        // Calculamos la altura segura de la columna según alto de pantalla
        const heightColums = - Math.floor(screenHeight / 3.5); // cada enemigo ocupa 64px

        // Enemigos por tipo
        const mainCount = level === 1 ? 24 : 26;
        const secondaryCount = level === 1 ? 24 : 26;
        const totalEnemies = mainCount + secondaryCount;

        this.enemies = this.relatedScene.physics.add.group();

        // Crear enemigos
        for (let i = 0; i < mainCount; i++) {
            const enemy = this.enemies.create(0, 0, 'main-enemies');
            enemy.setData('type', 'main');
        }
        for (let i = 0; i < secondaryCount; i++) {
            const enemy = this.enemies.create(0, 0, 'secondary-enemies');
            enemy.setData('type', 'secondary');
        }

        // Alinear en cuadrícula con columnas ajustadas
        Phaser.Actions.GridAlign(this.enemies.getChildren(), {
            width: maxColumns,
            cellWidth: 64,
            cellHeight: 64,
            x: 0,
            y: heightColums
        });

        // Animaciones
        this.relatedScene.anims.create({
            key: 'main-enemies-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('main-enemies', { frames: [0, 1, 2] }),
            frameRate: 5,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'secondary-enemies-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('secondary-enemies', { frames: [0, 1, 2] }),
            frameRate: 5,
            repeat: -1
        });

        // Propiedades visuales y animaciones
        this.enemies.getChildren().forEach(enemy => {
            enemy.setScale(0.4).setAngle(350).setDepth(2);
            enemy.setData('score', enemy.getData('type') === 'main' ? 100 : 250);

            if (enemy.getData('type') === 'main') {
                enemy.play('main-enemies-animation');
            } else {
                enemy.play('secondary-enemies-animation');
            }
        });

        // Formación y descenso
        this.formation = {
            ACCELERATION_ON_THE_X_AXIS: 0,
            SPEED_ON_THE_X_AXIS: 1,
            JOURNEY: 60,
        };

        let frequency = 7000 - level * 500;
        if (frequency < 2500) frequency = 2500;

        let descentTargetY = screenHeight - (100 - level * 10);

        if (descentTargetY > screenHeight - 20) {
            descentTargetY = screenHeight - 20;
        }

        const enemies = this.enemies.getChildren();
        let descendingEnemies = enemies;
        if (level === 1) {
            descendingEnemies = enemies.slice(mainCount);
        }

        this.relatedScene.tweens.add({
            targets: descendingEnemies,
            y: descentTargetY,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            delay: 5000,
            repeat: -1,
            repeatDelay: frequency
        });

        // DEBUG: Verificar tipo y score de cada enemigo
        // this.enemies.getChildren().forEach(enemy => {
        //   console.log(`[DEBUG] Enemy creado: tipo=${enemy.getData('type')} | score=${enemy.getData('score')}`);
        // });
    }

    update() {

        this.formation.ACCELERATION_ON_THE_X_AXIS += this.formation.SPEED_ON_THE_X_AXIS;

        if ((this.formation.ACCELERATION_ON_THE_X_AXIS >= this.formation.JOURNEY && this.formation.SPEED_ON_THE_X_AXIS > 0) || (this.formation.ACCELERATION_ON_THE_X_AXIS <= -this.formation.JOURNEY / 2 && this.formation.SPEED_ON_THE_X_AXIS < 0)) {
            this.formation.SPEED_ON_THE_X_AXIS = -this.formation.SPEED_ON_THE_X_AXIS;
        }

        Phaser.Actions.IncX(this.enemies.getChildren(), this.formation.SPEED_ON_THE_X_AXIS);
    }


    get() {
        return this.enemies;
    }

}