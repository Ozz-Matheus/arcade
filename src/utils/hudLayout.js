// src/utils/hudLayout.js

export function hudLayout(scene) {

  const { width, height } = scene.scale;

  // escala móvil
  const scale = Phaser.Math.Clamp(height / 800, 0.75, 1.0);

  // tamaño REAL del frame 0 del sprite (no asumimos 100x100)
  const f = scene.textures.getFrame('virtual-gamepad', 0);
  const base = f ? Math.max(f.width, f.height) : 100;
  const padSize = Math.round(base * scale);

  // safe-area CSS
  const css = getComputedStyle(document.documentElement);
  const raw = css.getPropertyValue('--safe-bottom') || '0';
  const safeEnv = parseFloat(raw) || 0;

  // Fallback Chrome iOS: usa visualViewport para estimar la barra inferior
  let toolbar = 0;
  if (window.visualViewport) {
    const layoutH = document.documentElement.clientHeight; // alto del layout viewport
    toolbar = Math.max(0, Math.round(layoutH - window.visualViewport.height));
  }

  // Extra mínimo en iOS para no rozar la "home bar"
  const isIOS = !!scene.sys.game.device?.os?.iOS;
  const extra = isIOS ? 6 : 0;

  const safeBottom = Math.max(safeEnv, toolbar) + extra;

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
