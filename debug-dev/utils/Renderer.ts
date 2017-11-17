import * as THREE from 'three';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_ROTATION_SPEED } from '../configs/constants';

function transformToColor(color: THREE.Color|number): THREE.Color {
  if (color instanceof THREE.Color) {
    return color;
  } else if (typeof color === "number") {
    return new THREE.Color(color);
  }
  return new THREE.Color();
}

function createRenderer(canvas?: HTMLCanvasElement, options: {
  clearColor?: THREE.Color,
} = {}): THREE.WebGLRenderer {
  let renderer: THREE.WebGLRenderer;
  const clearColor = transformToColor(options.clearColor);
  if (canvas) {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    // set backgroundColor of Renderer
    renderer.setClearColor(clearColor);
    renderer.setSize(canvas.width, canvas.height);
  } else {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
    renderer.setClearColor(new THREE.Color(clearColor));
    document.body.appendChild(renderer.domElement);
  }
  return renderer;
}

function animate(camera: THREE.PerspectiveCamera) {
  // if (this.autoRotate) {
  // TODO 原理?
  camera.position.x =
    camera.position.x * Math.cos(DEFAULT_ROTATION_SPEED) -
    camera.position.z * Math.sin(DEFAULT_ROTATION_SPEED);
  camera.position.z =
    camera.position.z * Math.cos(DEFAULT_ROTATION_SPEED) +
    camera.position.x * Math.sin(DEFAULT_ROTATION_SPEED);
  // }
}

function renderScene(
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) {
  requestAnimationFrame(() => renderScene(renderer, scene, camera));
  renderer.render(scene, camera);
  animate(camera);
}

export {
  createRenderer,
  renderScene,
};
