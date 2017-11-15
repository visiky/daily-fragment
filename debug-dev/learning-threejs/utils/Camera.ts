import * as THREE from 'three';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '../configs/constants';

function createCamera(canvas?: HTMLCanvasElement): THREE.PerspectiveCamera {
  const aspect = canvas
    ? canvas.width / canvas.height
    : DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT;
  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);

  // 倾斜一下camera的位置
  // camera.position.x = -30;
  // camera.position.y = 40;
  // camera.position.z = 30;

  return camera;
}

export {
  createCamera,
};
