import * as THREE from 'three';

function createLambertMaterail(options: {
  color?: string,
  map?: THREE.Texture,
}): THREE.MeshLambertMaterial {

  const {
    color = Math.random() * 0xffffff,
    map,
  } = options;
  return new THREE.MeshLambertMaterial({
    color,
    map,
  });
}

function createPhongMaterial(options: {
  color?: string|number,
  map?: THREE.Texture,
  [type: string]: any,
} = {}): THREE.MeshLambertMaterial {

  const {
    color = Math.random() * 0xffffff,
    map,
  } = options;
  return new THREE.MeshPhongMaterial({
    color,
    map,
  });
}

export {
  createLambertMaterail,
  createPhongMaterial,
};
