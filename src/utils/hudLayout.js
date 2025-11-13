// src/utils/hudLayout.js

export function hudLayout(scene) {

  // Tamaño lógico del juego (unidades del mundo)
  const W = scene.scale.width;
  const H = scene.scale.height;

  // Escala móvil (en unidades del mundo)
  const scale = Phaser.Math.Clamp(H / 800, 0.75, 1.0);

  // Tamaño base del sprite de pad (en unidades del mundo)
  const f = scene.textures.getFrame('virtual-gamepad', 0);
  const base = f ? Math.max(f.width, f.height) : 100;
  const padSize = Math.round(base * scale);

  // ----- Safe-area y toolbars en PX CSS -----
  const css = getComputedStyle(document.documentElement);
  const raw = css.getPropertyValue('--safe-bottom') || '0';
  const safeEnvPx = parseFloat(raw) || 0;

  // Fallback Chrome iOS: diferencia entre layoutViewport y visualViewport (en PX CSS)
  let toolbarPx = 0;
  if (window.visualViewport) {
    const layoutH = document.documentElement.clientHeight;
    toolbarPx = Math.max(0, Math.round(layoutH - window.visualViewport.height));
  }

  // Pequeño extra para no tocar la "home bar"
  const isIOS = !!scene.sys.game.device?.os?.iOS;
  const extraPx = isIOS ? 6 : 0;

  const safeBottomPx = Math.max(safeEnvPx, toolbarPx) + extraPx;

  // ----- Conversión PX CSS -> unidades del mundo -----
  // Escala visual aplicada al canvas (displaySize / gameSize)
  const dispH = scene.scale.displaySize?.height ?? H;
  const scaleY = dispH / H || 1;
  const safeBottom = safeBottomPx / scaleY; // ahora en unidades del mundo

  // Márgenes (en unidades del mundo)
  const margin = Math.max(16, Math.round(H * 0.02));
  const bottomGap = Math.max(8, Math.round(H * 0.012));
  const baselineY = Math.round(H - (margin + bottomGap + safeBottom));

  // ⬅️ Joystick (origin 0.5)
  const leftPad = {
    x: Math.round(margin + padSize / 2),
    y: Math.round(baselineY - padSize / 2),
  };

  // ➡️ Fire (origin 1,1)
  const fire = {
    x: Math.round(W - margin),
    y: baselineY,
  };

  const showFullscreen = !!scene.sys.game.device?.os?.desktop;
  return { scale, padSize, leftPad, fire, showFullscreen };
}
