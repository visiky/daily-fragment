/**
 * 路径常量等
 */
const IMAGE_BASEURL = './assets/images';

/**
 * 容器，尺寸等等
 */
const AppContainer = document.querySelector('.app-container') || document.body;
const DEFAULT_CANVAS_WIDTH = calDefaultCanvasSize().width;
const DEFAULT_CANVAS_HEIGHT = calDefaultCanvasSize().height;

function calDefaultCanvasSize() {
  const rect = AppContainer.getBoundingClientRect();
  return {
    width: rect.width * (3 / 5),
    height: rect.height,
  };
}
/**
 * 速度等等
 */
const ROTATION_DURATION = 10; // ms
const DEFAULT_ROTATION_SPEED = 0.001;

export {
  AppContainer,
  IMAGE_BASEURL,
  DEFAULT_CANVAS_WIDTH,
  DEFAULT_CANVAS_HEIGHT,
  ROTATION_DURATION,
  DEFAULT_ROTATION_SPEED,
};
