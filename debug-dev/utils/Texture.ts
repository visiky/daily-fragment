import * as THREE from 'three';

const IMAGE_ROOT = './assets/images/x-plan';
const IMAGE_BASEURLS = {
  earth: `${IMAGE_ROOT}/earth.jpg`,
  earthBump: `${IMAGE_ROOT}/earth_bump.jpg`,
  earthSpec: `${IMAGE_ROOT}/earth_spec.jpg`,
};

// Utils
function getTexture(imageName: string) {
  return new THREE.TextureLoader().load(IMAGE_BASEURLS[imageName]);
}
export { getTexture };
