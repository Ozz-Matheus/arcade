// src/scenes/game.js

import { loader } from './loader.js';
import { Stars } from '../components/stars.js';
import { Player } from '../components/player.js';
import { Bullets } from '../components/bullets.js';
import { Enemies } from '../components/enemies.js';
import { Explosions } from '../components/explosions.js';
import { Attacks } from '../components/attacks.js';
import { Particles } from '../components/particles.js';
import { Settings } from '../settings.js';
import { Texts } from '../utils/translations.js';
import { ScoreBoard } from '../components/scoreboard.js';
import { LivesDisplay } from '../components/livesdisplay.js';
import { FireButton } from '../components/firebutton.js';
import { VirtualGamepad } from '../components/virtualgamepad.js';
import { FullscreenButton } from '../components/fullscreenbutton.js';


/* ------------------------------------------------------------------------------------------ */

export class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    init() {

        this.input.addPointer(3);

        this.stars = new Stars(this);
        this.player = new Player(this);
        this.bullets = new Bullets(this);
        this.enemies = new Enemies(this);
        this.attacks = new Attacks(this);
        this.explosions = new Explosions(this);
        this.particles = new Particles(this);
        this.livesDisplay = new LivesDisplay(this);
        this.scoreboard = new ScoreBoard(this);

        this.virtualGamepad = new VirtualGamepad(this);

        this.fireButton = new FireButton(this);

        this.fullscreen = new FullscreenButton(this);

    }

    preload() {
        loader(this);
    }

    create(){

        Settings.setPoints(0);
        Settings.setLives(3);

        this.fullscreen.create();

        this.livesDisplay.create();

        this.scoreboard.create();

        this.scoreboard.updateLevel(Settings.getLevel());

        this.registry.set('level', Settings.getLevel());

        this.bullet_sound = this.sound.add('bullet-sound');
        this.explosion_sound = this.sound.add('explosion-sound');

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.stars.create();
        this.player.create();
        this.bullets.create();
        this.enemies.create();
        this.attacks.create();
        this.explosions.create();
        this.particles.create();

        this.physics.add.overlap(this.enemies.get(), this.bullets.get(), this.handleBulletHitsEnemy, null, this);

        this.physics.add.overlap(
          this.attacks.get(),
          this.player.get(),
          this.onAttackHitPlayer,
          (attack, player) => player.alpha >= 1,
          this
        );

        this.physics.add.overlap(
          this.enemies.get(),
          this.player.get(),
          this.onEnemyHitPlayer,
          (enemy, player) => player.alpha >= 1,
          this
        );

        this.virtualGamepad.createJoystick(100, 520, 1.2);

        this.fireButton.create();

    }

    update() {

        this.handlePlayerShooting();

        this.handleEnemyShooting();

        this.stars.update();
        this.player.update();
        this.bullets.update();
        this.enemies.update();
        this.attacks.update();

        const props = this.virtualGamepad.getProperties();

        if (props.left) {
          this.player.get().setVelocityX(-Player.SPEED_ON_THE_X_AXIS);
        } else if (props.right) {
          this.player.get().setVelocityX(Player.SPEED_ON_THE_X_AXIS);
        }

    }




    handlePlayerShooting() {
        if (!this.player.get().active || !this.player.get().visible) return;

        if (this.player.controls.space.isDown || this.fireButton?.isDown) {
            if (this.time.now > this.bullets.rhythm.flag) {
                //console.log('bullet');
                let find = false;

                this.bullets.get().getChildren().forEach(bullet => {
                    if (!bullet.active && !bullet.visible && !find) {
                        find = true;
                        bullet.setActive(true).setVisible(true).enableBody(true, true);
                        bullet.setX(this.player.get().x);
                        bullet.setY(this.player.get().y - Math.floor(this.player.get().body.height / 2));
                        bullet.setVelocityY(Bullets.SPEED_ON_THE_Y_AXIS);
                        bullet.setAlpha(0.9);
                        this.bullet_sound.play();
                    }
                });

                this.bullets.rhythm.flag = this.time.now + this.bullets.rhythm.bullets;
            }
        }
    }


    handleBulletHitsEnemy(enemies, bullets){

        //console.log("explosion");

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

        const score = enemies.getData('score') ?? 100;
        Settings.setPoints(Settings.getPoints() + score);

        this.scoreboard.updatePoints(Settings.getPoints());


        bullets.setActive(false).setVisible(false).disableBody(true, true);
        enemies.setActive(false).setVisible(false).disableBody(true, true);

        this.particles.spawn(enemies.x, enemies.y);

        if (this.enemies.get().countActive(true) === 0) {
          this.time.delayedCall(1000, () => {
            this.scene.start('levelpassed');
          });
        }
    }

    handleEnemyShooting(){

        //console.log("Attack");

        let find = false;

        this.enemies.get().children.iterate(enemy => {

            if(enemy.body.enable){

                this.attacks.get().getChildren().forEach(attack => {

                    if( Phaser.Math.Between(0, 999) < 20 && this.time.now > this.attacks.rhythm.flag ){

                        find = true;

                        this.configureEnemyAttack(attack, enemy);

                        this.tweens.add({
                          targets: enemy,
                          angle: 360,
                          duration: 300,
                          yoyo: true
                        });


                        this.attacks.rhythm.flag = this.time.now + this.attacks.rhythm.attacks;

                    }

                });

            }

        });

    }

    configureEnemyAttack(attack, enemy){

        attack.setActive(true).setVisible(true);
        attack.enableBody(true, enemy.x, enemy.y,true, true);
        attack.setVelocityY( Attacks.SPEED_ON_THE_Y_AXIS );
        attack.setScale(0.8);
    }

    onAttackHitPlayer(attack, player) {
      // Desactivar ataque enemigo
      attack.setActive(false).setVisible(false).disableBody(true, true);
      this.damagePlayer(player);
    }

    onEnemyHitPlayer(player, enemy) {

      const type = enemy.getData('type');
      const score = enemy.getData('score') ?? 100;

      //console.log('[COLISIÓN] Enemigo tipo:', type);
      //console.log('[COLISIÓN] Enemigo puntaje:', score);

      Settings.setPoints(Settings.getPoints() + score);
      this.scoreboard.updatePoints(Settings.getPoints());

      this.particles.spawn(enemy.x, enemy.y);
      this.explosions.spawn(enemy.x, enemy.y, this.explosion_sound);

      enemy.setActive(false).setVisible(false).disableBody(true, true);

      this.damagePlayer(player);

    }

    damagePlayer(player) {

     // Reducir vidas y actualizar HUD
      Settings.setLives(Settings.getLives() - 1);
      this.livesDisplay.removeOneLife();

      // Ocultar jugador
      player.setActive(false).setVisible(false).disableBody(true, true);

     // Efecto visual
      this.particles.spawn(player.x, player.y);
      this.explosions.spawn(player.x, player.y, this.explosion_sound);

      // Verificar si ya no tiene vidas
      if (Settings.getLives() <= 0) {
        this.time.delayedCall(1000, () => this.scene.start('gameover'));
        return;
      }

      // Revivir jugador tras pausa e invulnerabilidad
      this.time.delayedCall(1500, () => {
        const player = this.player.get();
        const [x, y] = player.getData('posIni');

        player.setActive(true).setVisible(true).setAlpha(0.1);
        player.enableBody(true, x, y, true, true);

        // Fade-in gradual
        this.tweens.add({
          targets: player,
          alpha: 1,
          duration: 1500,
        });
      });
    }



}