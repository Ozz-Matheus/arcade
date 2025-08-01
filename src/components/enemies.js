// src/components/enemies.js

/* ------------------------------------------------------------------------------------------ */

export class Enemies {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create(){

        this.enemies = this.relatedScene.physics.add.group({
            key: 'main-enemies',
            frameQuantity: 48,
            gridAlign: {
                width: 12,
                height: 4,
                cellWidth: 64,
                cellHeight: 64,
                x: 0,
                y: 64
            }
        });

        this.relatedScene.anims.create({
            key: 'enemies-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('main-enemies', { frames: [ 0, 1, 2 ]}),
            frameRate: 5,
            repeat: -1
        });


        this.relatedScene.tweens.add({
            targets: this.enemies.getChildren(),
            angle: 10,
            yoyo: true,
            duration: 1000,
            repeat: -1
        });


        this.enemies.children.iterate(enemy => {

            enemy.setScale(0.4).setAngle(350).setDepth(2);
            enemy.setData('score', 100 + Phaser.Math.Between(0, 9) * 10);

            enemy.play('enemies-animation');
        });


        this.formation = {
            ACCELERATION_ON_THE_X_AXIS: 0,
            SPEED_ON_THE_X_AXIS: 1,
            JOURNEY: 60
        };

    	//console.log(this.enemies);

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