import * as THREE from 'three';
import { createMesh } from './createCommonMesh';

const DEFAULT_OPTIONS = {
  size: 90,
  height: 90,
  weight: 'normal',
  style: 'normal',
  color: 0xfff,
  bevelThickness: 2,
  bevelSize: 4,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1,
};
export function createText(options: {
  width?: number,
  height?: number,
  material?: THREE.Material,
} = {}): THREE.Mesh {
  const {
      width,
      height,
      material,
  } = Object.assign(options, DEFAULT_OPTIONS);
  const textGeo = new THREE.TextGeometry('');
  return createMesh(textGeo, material);
}

function getLambertMaterail() {
  return new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
}
