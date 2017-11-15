import * as THREE from 'three';

const IMAGE_ROOT = './assets/images';

// Utils
function getTexture(imageName: string): THREE.Texture {
  return new THREE.TextureLoader().load(`${IMAGE_ROOT}${imageName}`);
}

function createWoodTexture(): THREE.Texture {
  return getTexture('/wood.jpg');
}

export { getTexture, createWoodTexture };
