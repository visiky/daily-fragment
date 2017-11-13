import * as THREE from 'three';
export function createPlane(options: {
  width?: number,
  height?: number,
  material?: THREE.Material,
} = {}): THREE.Mesh {
  const {
      width = 60,
      height = 60,
      material = getLambertMaterail(),
  } = options;
  const planeGeo = new THREE.PlaneGeometry(width, height);
  return new THREE.Mesh(planeGeo, material);
}

function getLambertMaterail() {
  return new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
}
