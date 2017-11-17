import * as THREE from 'three';

export function createMesh(geometry: THREE.Geometry, material?: THREE.Material): THREE.Mesh {

  if (material) {
    return new THREE.Mesh(geometry, material);
  } else {
    // assign two materials
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMaterial = new THREE.MeshBasicMaterial();
    wireFrameMaterial.wireframe = true;
    // create a multimaterial
    // return THREE.SceneUtils.createMultiMaterialObject(geometry, [
    //   meshMaterial,
    //   wireFrameMaterial,
    // ]) as THREE.Mesh;
    return new THREE.Mesh(geometry, meshMaterial);
  }
}
