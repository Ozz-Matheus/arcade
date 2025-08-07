// src/utils/scaling.js

export function getUIScale(scene, baseWidth = 800, max = 1) {
    const width = scene.scale?.parentSize?.width || baseWidth;
    return Math.min(width / baseWidth, max);
}
