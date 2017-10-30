import * as THREE from 'three';
import { getTexture } from '../../../utils';

export function createCloud() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(5.2, 40, 40),
    new THREE.MeshPhongMaterial({
      map: getTexture('earthCloud'),
      transparent: true,
      opacity: 1,
      // blending: AdditiveBlending
    }),
  );
}
