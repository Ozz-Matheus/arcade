// src/components/explosions.js

/* ------------------------------------------------------------------------------------------ */

export class Explosions{

    static NUMBER_OF_EXPLOSIONS = 9;
    static DURATION_OF_THE_EXPLOSION = 1000;

    constructor(scene) {

        this.relatedScene = scene;
    }

    create() {

        this.explosions = this.relatedScene.physics.add.group({
            key: 'explosion',
            setXY: { x: -5555, y: -5555, stepX: 100 },
            repeat: Explosions.NUMBER_OF_EXPLOSIONS
        });

        this.relatedScene.anims.create({
            key: 'explosion-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('explosion', { frames: [1, 2, 3] }),
            frameRate: 15,
            repeat: -1
        });

        this.explosions.children.iterate(explosion => {
            explosion.setScale(2);
            explosion.setActive(false).setVisible(false);
            explosion.play('explosion-animation');
        });

        //console.log(this.explosions);
    }

    update() {

    }

    get() {
        return this.explosions;
    }


}