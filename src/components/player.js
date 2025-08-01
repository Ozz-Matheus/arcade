// src/components/player.js

/* ------------------------------------------------------------------------------------------ */

export class Player {


    static SPEED_ON_THE_X_AXIS = 520;
    static ACCELERATION_ON_THE_X_AXIS = 500;
    static SPEED_ON_THE_Y_AXIS = 0;
    //static REVIVE_PAUSE = 4000;
    //static DURATION_OF_THE_EXPLOSION = 1150;


    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const INITIAL_POSITION_IN_X = Math.floor(this.relatedScene.sys.game.config.width / 2);
        const INITIAL_POSITION_IN_Y = Math.floor(this.relatedScene.sys.game.config.height / 1.08);

        this.player = this.relatedScene.physics.add.sprite(INITIAL_POSITION_IN_X, INITIAL_POSITION_IN_Y, 'player');
        this.player.setScale(0.4, 0.4);
        //this.player.setAlpha(1);

        this.player.setData('posIni', [INITIAL_POSITION_IN_X, INITIAL_POSITION_IN_Y]);
        this.player.setData('vel-x', Player.SPEED_ON_THE_X_AXIS);
        this.player.setData('acel-x', Player.ACCELERATION_ON_THE_X_AXIS);
        this.player.setData('vel-y', Player.SPEED_ON_THE_Y_AXIS);

        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);

        this.controls = this.relatedScene.input.keyboard.createCursorKeys();

        //console.log(this.controls);
        //console.log(this.player, this.player.x, this.player.body.width, this.player.width);

    }


    update() {

        if (this.controls.left.isDown) {

            this.player.setVelocityX(-this.player.getData('vel-x'));

        } else if (this.controls.right.isDown) {

            this.player.setVelocityX(this.player.getData('vel-x'));

        } else {
            this.player.setVelocityX(0);
        }

    }

    get() {
        return this.player;
    }

































}