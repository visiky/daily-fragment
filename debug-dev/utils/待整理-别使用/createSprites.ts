import * as THREE from 'three';
import { getTexture } from '../../utils/Texture';

/**
 * @desc 精灵图测试
 * @todo 迁移
 */
function createSprites(scene: THREE.Scene) {
  const material = new THREE.SpriteMaterial({
    map: getTexture('kumo-bear/bear-1.png'),
    color: 0xffffff,
  });
  const range = 500;
  for (let i = 0; i < 1500; i++) {
    const sprite = new THREE.Sprite(material);
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
    );
    sprite.scale.set(10, 10, 10);
    scene.add(sprite);
  }
}
