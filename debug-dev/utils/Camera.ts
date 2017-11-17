import * as THREE from 'three';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '../configs/constants';

function createCamera(canvas?: HTMLCanvasElement, options: {
 aspect?: number,
 [type: string]: any,
} = {}): THREE.PerspectiveCamera {
  const {
    aspect = canvas
    ? canvas.width / canvas.height
    : DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT,
  } = options;
  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  camera.position.z = 5;

  return camera;
}

export {
  createCamera,
};
