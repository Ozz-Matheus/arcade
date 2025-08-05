// src/components/enemies.js

/* ------------------------------------------------------------------------------------------ */

export class Enemies {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const level = this.relatedScene.registry.get('level') || 1;
        const [mainCount, secondaryCount] = level === 1 ? [24, 24] : [36, 36];

        const totalEnemies = mainCount + secondaryCount;

        this.enemies = this.relatedScene.physics.add.group();

        // Crear main-enemies
        for (let i = 0; i < mainCount; i++) {
          const enemy = this.relatedScene.physics.add.sprite(0, 0, 'main-enemies');
          enemy.setData('type', 'main');
          this.enemies.add(enemy);
        }

        // Crear secondary-enemies
        for (let i = 0; i < secondaryCount; i++) {
          const enemy = this.relatedScene.physics.add.sprite(0, 0, 'secondary-enemies');
          enemy.setData('type', 'secondary');
          this.enemies.add(enemy);
        }

        Phaser.Actions.GridAlign(this.enemies.getChildren(), {
          width: 12,
          cellWidth: 64,
          cellHeight: 64,
          x: 0,
          y: 64,
        });


        this.relatedScene.anims.create({
          key: 'main-enemies-animation',
          frames: this.relatedScene.anims.generateFrameNumbers('main-enemies', { frames: [0, 1, 2] }),
          frameRate: 5,
          repeat: -1,
        });

        this.relatedScene.anims.create({
          key: 'secondary-enemies-animation',
          frames: this.relatedScene.anims.generateFrameNumbers('secondary-enemies', { frames: [0, 1, 2] }),
          frameRate: 5,
          repeat: -1,
        });

        this.enemies.getChildren().forEach(enemy => {
          enemy.setScale(0.4).setAngle(350).setDepth(2);
          enemy.setData('score', enemy.getData('type') === 'main' ? 100 : 250);

          if (enemy.getData('type') === 'main') {
            enemy.play('main-enemies-animation');
          } else {
            enemy.play('secondary-enemies-animation');
          }
        });

      this.formation = {
        ACCELERATION_ON_THE_X_AXIS: 0,
        SPEED_ON_THE_X_AXIS: 1,
        JOURNEY: 60,
      };

      // Movimiento descendente periódico
      this.relatedScene.time.addEvent({
        delay: 5000,
        loop: true,
        callback: () => {
          this.relatedScene.tweens.add({
            targets: this.enemies.getChildren(),
            y: "+=40",
            duration: 500,
            yoyo: true
          });
        }
      });

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