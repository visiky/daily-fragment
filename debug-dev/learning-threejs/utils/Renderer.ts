import * as THREE from 'three';
import { AppContainer, DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH,
  DEFAULT_ROTATION_SPEED } from '../configs/constants';

function createCanvas(width: number = DEFAULT_CANVAS_WIDTH, height = DEFAULT_CANVAS_HEIGHT) {
  const canvas = document.getElementsByTagName('canvas')[0] || document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
  AppContainer.appendChild(canvas);
  return canvas;
}

function createRenderer(canvas: HTMLCanvasElement = createCanvas()): THREE.WebGLRenderer {
  let renderer: THREE.WebGLRenderer;
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(canvas.width, canvas.height);
  renderer.setClearColor('#FFF');
  return renderer;
}

export function animateCamera(camera: THREE.PerspectiveCamera) {
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
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

export {
  createRenderer,
  renderScene,
};
