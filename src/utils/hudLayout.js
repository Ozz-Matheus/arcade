// src/utils/hudLayout.js

export function hudLayout(scene) {

  const { width, height } = scene.scale;

  // Escala mobile-first cómoda
  const scale = Phaser.Math.Clamp(height / 800, 0.75, 1.0);

  // Tamaño real del sprite del gamepad (de tu spritesheet: 100x100)
  const SPRITE_SIZE = 100;
  const padSize = SPRITE_SIZE * scale;

  // Márgenes y un pequeño gap inferior para que nada toque el borde
  const margin = Math.round(Math.max(16, height * 0.02));
  const bottomGap = Math.round(Math.max(8, height * 0.012));

  // Joystick (centrado): dejamos su borde izquierdo en "margin"
  // y su borde inferior alineado con "height - margin - bottomGap"
  const leftPad = {
    x: margin + padSize / 2,
    y: height - margin - bottomGap - padSize / 2,
  };

  // Botón de disparo (anclado a esquina con origin(1,1)):
  // mismo baseline que el joystick
  const fire = {
    x: width - margin - bottomGap,
    y: height - margin - bottomGap,
  };

  // Fullscreen solo en desktop
  const showFullscreen = !!scene.sys.game.device?.os?.desktop;

  return { scale, margin, leftPad, fire, showFullscreen };

}
