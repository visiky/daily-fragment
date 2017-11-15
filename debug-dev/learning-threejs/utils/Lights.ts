import * as THREE from 'three';

/**
 * @param options {hex: 颜色, intensity: 强度}
 */
function createAmbientLight(options: {
  hex?: string|number,
  intensity?: number,
} = {}): THREE.AmbientLight {
  const {
    hex = 0x0c0c0c,
    intensity = 1,
  } = options;
  return new THREE.AmbientLight(hex, intensity);
}

function createSpotLight(options: {
  hex?: string|number,
  intensity?: number,
} = {}): THREE.SpotLight {
  const {
    hex = 0xffffff,
    intensity = 1,
  } = options;
  const spotLight = new THREE.SpotLight(hex, intensity);
//   spotLight.position.set(-26, 11, -11);
//   spotLight.angle = 0.2;
//   spotLight.castShadow = false;
//   spotLight.penumbra = 0.4;
//   spotLight.distance = 124;
//   spotLight.decay = 1;
//   spotLight.shadow.camera = new THREE.PerspectiveCamera(35, 45, 50, 200);
//   spotLight.shadow.mapSize.height = 1024;
//   spotLight.shadow.mapSize.width = 1024;

  /**
   * @todo 可以在这里设置控制器 由外部来控制是否使用
   */
  return spotLight;
}

// function createDirectionalLight(): THREE.DirectionalLight {
//   const light = new THREE.DirectionalLight(0xffffff, 1);
//   light.position.set(5, 3, 5);
//   return light;
// }

export {
  createAmbientLight,
  createSpotLight,
  // createDirectionalLight,
};
