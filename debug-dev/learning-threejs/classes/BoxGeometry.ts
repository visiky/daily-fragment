import * as THREE from 'three';
export function createCube(options: {
  cubeSize?: number,
  material?: THREE.Material,
} = {}): THREE.Mesh {
  const {
      cubeSize = Math.ceil((Math.random() * 3)),
      material = getLambertMaterail(),
  } = options;
  const boxGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

  // position the cube randomly in the scene
  const cube = new THREE.Mesh(boxGeo, material);

  return cube;
}

export function createCuboid(options: {
  width?: number,
  height?: number,
  depth?: number,
  material?: THREE.Material,
} = {}): THREE.Mesh {
  const {
      width = Math.ceil((Math.random() * 3)),
      height = Math.ceil((Math.random() * 3)),
      depth = Math.ceil((Math.random() * 3)),
      material = getLambertMaterail(),
  } = options;
  const cube = new THREE.BoxGeometry(width, height, depth);
  return new THREE.Mesh(cube, material);
}

function getLambertMaterail(map?: THREE.Texture) {
  return new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
    map,
  });
}
