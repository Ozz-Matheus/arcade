// src/scenes/game.js

import { loader } from './loader.js';
import { Stars } from '../components/stars.js';
import { Player } from '../components/player.js';
import { Bullets } from '../components/bullets.js';
import { Enemies } from '../components/enemies.js';
import { Explosions } from '../components/explosions.js';
import { Attacks } from '../components/attacks.js';
import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { ScoreBoard } from '../components/scoreboard.js';
import { LivesDisplay } from '../components/livesdisplay.js';



/* ------------------------------------------------------------------------------------------ */

export class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.stars = new Stars(this);
        this.player = new Player(this);
        this.bullets = new Bullets(this);
        this.enemies = new Enemies(this);
        this.attacks = new Attacks(this);
        this.explosions = new Explosions(this);
        this.scoreboard = new ScoreBoard(this);
        this.livesDisplay = new LivesDisplay(this);
    }

    preload() {
        loader(this);
    }

    create(){

        Settings.setPoints(0);
        Settings.setLevel(1);
        Settings.setLives(3);

        this.livesDisplay.create();

        this.add.text(30, 30, Texts.score(0), {
          fontSize: '32px',
          fill: '#fff'
        });

        this.scoreText = this.add.text(20, 20, Texts.score(Settings.getPoints()), {
          fontSize: '24px',
          fill: '#fff'
        });


        this.scoreboard.create();

        this.bullet_sound = this.sound.add('bullet-sound');
        this.explosion_sound = this.sound.add('explosion-sound');

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.stars.create();
        this.player.create();
        this.bullets.create();
        this.enemies.create();
        this.attacks.create();
        this.explosions.create();

        this.colisionDisparoEnemigos = this.physics.add.overlap(this.enemies.get(), this.bullets.get(), this.colisionDisparoVsEnemigos, null, this);
        this.physics.add.overlap(this.attacks.get(), this.player.get(), this.onPlayerHit, null, this);
    }

    update() {

        this.inicia_disparo_player();

        this.inicia_disparo_enemies();

        this.stars.update();
        this.player.update();
        this.bullets.update();
        this.enemies.update();
        this.attacks.update();


        Settings.setPoints(Settings.getPoints() + 100);
        this.scoreboard.updatePoints(Settings.getPoints());
        this.scoreText.setText(Texts.score(Settings.getPoints()));
    }

    inicia_disparo_player(){

        if(this.player.controls.space.isDown){

            if(this.time.now > this.bullets.rhythm.flag){

                console.log('bullet');

                let find = false;

                this.bullets.get().getChildren().forEach(bullet => {

                    if(!bullet.active && !bullet.visible && !find){

                        find = true;

                        bullet.setActive(true).setVisible(true).enableBody(true, true);
                        bullet.setX( this.player.get().x );
                        bullet.setY( this.player.get().y - Math.floor( this.player.get().body.height / 2 ) );
                        bullet.setVelocityY( Bullets.SPEED_ON_THE_Y_AXIS );
                        bullet.setAlpha(0.9);
                        this.bullet_sound.play();


                    }


                });

                this.bullets.rhythm.flag = this.time.now +this.bullets.rhythm.bullets;

            }

        }
    }


    colisionDisparoVsEnemigos(enemies, bullets){

        console.log("explosion");

        let find = false;

        this.explosions.get().getChildren().forEach(explosion => {

            if(!explosion.active && !explosion.visible && !find){

                find = true;

                explosion.setActive(true).setVisible(true);
                explosion.setX( enemies.x );
                explosion.setY( enemies.y );
                explosion.setScale(2);
                this.explosion_sound.play();

                setTimeout( ()=> {
                    explosion.setActive(false).setVisible(false);
                }, Explosions.DURATION_OF_THE_EXPLOSION);

            }
        });

        bullets.setActive(false).setVisible(false).disableBody(true, true);
        enemies.setActive(false).setVisible(false).disableBody(true, true);

        if (this.enemies.get().countActive(true) === 0) {
          this.time.delayedCall(1000, () => {
            this.scene.start('victory');
          });
        }
    }

    inicia_disparo_enemies(){

        console.log("Attack");

        let find = false;

        this.enemies.get().children.iterate(enemy => {

            if(enemy.body.enable){

                this.attacks.get().getChildren().forEach(attack => {

                    if( Phaser.Math.Between(0, 999) < 20 && this.time.now > this.attacks.rhythm.flag ){

                        find = true;

                        this.settings_attacks(attack, enemy);

                        this.attacks.rhythm.flag = this.time.now + this.attacks.rhythm.attacks;

                    }

                });

            }

        });

    }

    settings_attacks(attack, enemy){

        attack.setActive(true).setVisible(true);
        attack.enableBody(true, enemy.x, enemy.y,true, true);
        attack.setVelocityY( Attacks.SPEED_ON_THE_Y_AXIS );
        attack.setScale(0.8);
    }


    onPlayerHit(attack, player) {
      console.log("¡Jugador golpeado!");

      // Desactivar ataque enemigo
      attack.setActive(false).setVisible(false).disableBody(true, true);

      // Reducir vidas y actualizar HUD
      Settings.setLives(Settings.getLives() - 1);
      this.livesDisplay.removeOneLife();

      // Verificar si se quedó sin vidas
      if (Settings.getLives() <= 0) {
        this.scene.start('gameover');
      }
    }


}