import * as THREE from 'three';
import * as _ from 'lodash';

function createLambertMaterail(options: {
  color?: string|number,
  map?: THREE.Texture,
}): THREE.MeshLambertMaterial {

  const {
    color = Math.random() * 0xffffff,
  } = options;
  return new THREE.MeshLambertMaterial({
    color,
    ..._.omit(options, ['color']),
  });
}

function createPhongMaterial(options: {
  color?: string|number,
  map?: THREE.Texture,
  specularMap?: THREE.Texture,
  specular?: THREE.Color,
  [type: string]: any,
} = {}): THREE.MeshLambertMaterial {

  const {
    color = Math.random() * 0xffffff,
  } = options;
  return new THREE.MeshPhongMaterial({
    color,
    ..._.omit(options, ['color']),
  });
}

/**
 * @desc 允许您指定自己的着色器程序，以直接控制顶点的位置和像素的颜色
 * @todo 补充
 */
function createShaderMaterial(): THREE.ShaderMaterial {

  return new THREE.ShaderMaterial({
  });
}

export {
  createLambertMaterail,
  createPhongMaterial,
  createShaderMaterial,
};
