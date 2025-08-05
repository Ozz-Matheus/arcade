// src/components/attacks.js


import { Settings } from '../settings.js';


/* ------------------------------------------------------------------------------------------ */

export class Attacks {

	static MAXIMUM_NUMBER_OF_ATTACKS = 9;
	static SPEED_ON_THE_Y_AXIS = 100;

    constructor(scene) {
        this.relatedScene = scene;
    }

    create(){


        this.attacks = this.relatedScene.physics.add.group({
            key: 'flames',
            setXY: { x: -9999, y: 9999, stepX: 150 },
            repeat: Attacks.MAXIMUM_NUMBER_OF_ATTACKS
        });

        this.relatedScene.anims.create({
            key: 'attack-animation',
            frames: this.relatedScene.anims.generateFrameNumbers('flames', { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1
        });


        this.attacks.getChildren().forEach(attack => {
            attack.setScale(0.8);
            attack.setActive(false).setVisible(false).disableBody(true, true);
            attack.play('attack-animation');
            //console.log(attack.body.width, attack.body.height);
        });


        this.rhythm = {
            attacks: 1500 - Settings.getLevel() * 100,
            flag: 0
        };

    	//console.log(this.attacks);

    }

    update() {

        this.attacks.children.iterate(attack => {
            if (attack.y > this.relatedScene.sys.game.config.height) {

                attack.setActive(false).setVisible(false).disableBody(true, true);
            }
        });
    }

    get() {
        return this.attacks;
    }

}