import * as THREE from 'three';

// import { IMAGE_BASEURL } from './configs/constants';

export default class SphereGeometry {
  constructor(options: {
    [type: string]: any,
  } = {}) {
  }
}

export function createSphereGeometry(options: {
  radius?: number,
  [type: string]: any,
} = {}): THREE.SphereGeometry {
  const {
    radius = Math.random() * 10,
  } = options;
  // NOTE arg2, arg3 可以使圆更佳圆滑
  return new THREE.SphereGeometry(radius, 40, 40);
}

export function createBall(radius: number = 10): THREE.Mesh {
  const sphere = new THREE.SphereGeometry(radius);
  const material = new THREE.MeshBasicMaterial();
  const ball = new THREE.Mesh(
    sphere,
    material);
  return ball;
}
