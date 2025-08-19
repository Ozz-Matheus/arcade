// src/utils/scaling.js

export function getUIScale(scene, baseWidth = 800, max = 1) {
    const width = scene.scale?.parentSize?.width || baseWidth;
    return Math.min(width / baseWidth, max);
}

export function getBottomOffset(scene, factor = 0.20) {
    const height = scene.scale.parentSize.height;
    return height * factor;
}