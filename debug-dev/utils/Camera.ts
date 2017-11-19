import * as THREE from 'three';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '../configs/constants';

function createCamera(canvas?: HTMLCanvasElement, options: {
 fov?: number,
 aspect?: number,
 near?: number,
 far?: number,
 [type: string]: any,
} = {}): THREE.PerspectiveCamera {
  const {
    fov = 45,
    aspect = canvas
    ? canvas.width / canvas.height
    : DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT,
    near = 1,
    far = 1000,
  } = options;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  return camera;
}

export {
  createCamera,
};
