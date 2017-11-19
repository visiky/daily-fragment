import * as THREE from 'three';
import { createMesh } from './createCommonMesh';
import debug from 'debug';
const logger = debug('fanscape:font');

const BASE_ASSETS_URL = './assets/';
const DEFAULT_OPTIONS = {
  size: 5,
  height: 5,
  weight: 'normal',
  style: 'normal',
  color: 0xfff,
  // 斜面
  // bevelThickness: 2,
  // bevelSize: 4,
  // bevelSegments: 3,
  // bevelEnabled: true,
  // curveSegments: 12,
  steps: 1,
};

export function createText(text: string, options: {
  font?: any,
  width?: number,
  height?: number,
  size?: number,
  [type: string]: any,
  material?: THREE.Material,
} = {}): THREE.Mesh {
  options = Object.assign(DEFAULT_OPTIONS, options);
  const textGeo = new THREE.TextGeometry(text, options);
  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();
  return createMesh(textGeo, options.material);
}

function getLambertMaterail() {
  return new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
}
