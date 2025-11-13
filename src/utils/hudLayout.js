// src/utils/hudLayout.js

export function hudLayout(scene) {

  const { width, height } = scene.scale;

  // escala mobile-first (sin tocar jugabilidad)
  const scale = Phaser.Math.Clamp(height / 800, 0.75, 1.0);

  // márgenes coherentes
  const margin = Math.round(Math.max(16, height * 0.02));

  // posiciones ancladas a esquinas
  const leftPad = {
    x: margin + 70 * scale,
    y: height - margin - 70 * scale,
  };
  const fire = {
    x: width - margin,
    y: height - margin,
  };

  // fullscreen solo en desktop
  const showFullscreen = !!scene.sys.game.device?.os?.desktop;

  return { scale, margin, leftPad, fire, showFullscreen };
}
