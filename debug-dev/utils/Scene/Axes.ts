import * as THREE from 'three';

export function createAxes(size: number = 20): THREE.AxisHelper {
  const axes = new THREE.AxisHelper(size);
  return axes;
}
