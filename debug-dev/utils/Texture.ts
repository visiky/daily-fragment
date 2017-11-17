import * as THREE from 'three';

const IMAGE_ROOT = './assets/images';

// Utils
export function getTexture(imageName: string): THREE.Texture {
  return new THREE.TextureLoader().load(`${IMAGE_ROOT}${imageName}`);
}

export function createWoodTexture(): THREE.Texture {
  return getTexture('/wood.jpg');
}
