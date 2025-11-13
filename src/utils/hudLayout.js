// src/utils/hudLayout.js

export function hudLayout(scene) {
  const { width, height } = scene.scale;

  // escala móvil
  const scale = Phaser.Math.Clamp(height / 800, 0.75, 1.0);

  // tamaño REAL del frame 0 del sprite (no asumimos 100x100)
  const f = scene.textures.getFrame('virtual-gamepad', 0);
  const base = f ? Math.max(f.width, f.height) : 100;
  const padSize = Math.round(base * scale);

  // safe area iOS
  const css = getComputedStyle(document.documentElement);
  const raw = css.getPropertyValue('--safe-bottom') || '0';
  const safeBottom = parseFloat(raw) || 0;

  const margin = Math.max(16, Math.round(height * 0.02));
  const bottomGap = Math.max(8, Math.round(height * 0.012));
  const baselineY = Math.round(height - (margin + bottomGap + safeBottom));

  // ⬅️ joystick (origin 0.5)
  const leftPad = {
    x: Math.round(margin + padSize / 2),
    y: Math.round(baselineY - padSize / 2),
  };

  // ➡️ fire (origin 1,1)
  const fire = {
    x: Math.round(width - margin),
    y: baselineY,
  };

  const showFullscreen = !!scene.sys.game.device?.os?.desktop;
  return { scale, padSize, leftPad, fire, showFullscreen };
}
