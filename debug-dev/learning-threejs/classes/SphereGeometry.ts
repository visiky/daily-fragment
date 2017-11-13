import * as THREE from 'three';

// import { IMAGE_BASEURL } from './configs/constants';

export default class SphereGeometry {
  constructor(options?: {
    [type: string]: any,
  }) {
  }
}

export function createBall(radius: number = 10): THREE.Mesh {
  const sphere = new THREE.SphereGeometry(radius);
  const material = new THREE.MeshBasicMaterial();
  const ball = new THREE.Mesh(
    sphere,
    material);
  return ball;
}
