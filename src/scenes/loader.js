// src/scenes/loader.js

/* ------------------------------------------------------------------------------------------ */

export function loader (scene) {

/* ------------------------------------------------------------------------------------------ */

/* IMAGES */

/* ------------------------------------------------------------------------------------------ */


scene.load.image('background','./src/images/background.png');
scene.load.image('blue-star','./src/images/blue-star.png');
scene.load.image('red-star','./src/images/red-star.png');

scene.load.image('player', './src/images/player.png');
scene.load.spritesheet('lasers', './src/images/lasers.png', {frameWidth: 32, frameHeight: 65});
scene.load.spritesheet('main-enemies', './src/images/main-enemies.png', {frameWidth: 135, frameHeight: 95});
scene.load.spritesheet('explosion', './src/images/explosion.png', {frameWidth: 32, frameHeight: 32});
scene.load.spritesheet('flames', './src/images/flames.png', {frameWidth: 18, frameHeight: 39});

/* ------------------------------------------------------------------------------------------ */

/* AUDIO */

/* ------------------------------------------------------------------------------------------ */

scene.load.audio('bullet-sound', './src/audio/bullet.mp3');
scene.load.audio('explosion-sound', './src/audio/explosion.wav');


}