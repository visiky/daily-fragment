import * as THREE from 'three';
/**
 * @desc use THREE.JS to build a Christmas Tree for myself
 */

/**
 * Create a Star
 */
class Star {
  constructor() {
    this.init();
  }

  private init() {
    const leaf = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 1.6, 3, 4),
      new THREE.MeshStandardMaterial({
        color: 0x0b8450,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25,
      }),
    );
    // leaf.geometry.vertices[4].y -=1;
    leaf.rotateX(Math.random() * Math.PI * 2);
    leaf.rotateZ(Math.random() * Math.PI * 2);
    leaf.rotateY(Math.random() * Math.PI * 2);
    leaf.receiveShadow = true;
    leaf.castShadow = true;
  }
}
/**
 * Create a Gift box
 */
class Decoration {
  constructor() {}
}
/**
  * Create a Bell
  */
class Bell {
  constructor() {}
}

/**
 * Create Leaf
 */
class Leaf {
  constructor() {
    this.init();
  }

  private init() {
    const leaf = new THREE.Mesh(
      // 圆环形
      new THREE.TorusGeometry(0.8, 1.6, 3, 4),
      new THREE.MeshStandardMaterial({
        color: 0x0b8450,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25,
      }),
    );
    // leaf.geometry.vertices[4].y -=1;
    leaf.rotateX(Math.random() * Math.PI * 2);
    leaf.rotateZ(Math.random() * Math.PI * 2);
    leaf.rotateY(Math.random() * Math.PI * 2);
    leaf.receiveShadow = true;
    leaf.castShadow = true;
  }
}
/**
 * Create a Tree
 */
class Tree {
  constructor() {}
}
