import * as THREE from 'three';

function createGroup(name?: string): THREE.Group {
  const group: any = new THREE.Group();
  // Customize Object Name
  group.name = name;

  return group;
}

export {
  createGroup,
};
