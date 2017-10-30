import * as THREE from 'three';
import { createEarth } from './earth/earth';
import { createRenderer, renderScene } from '../../utils/Renderer';
import { createScene } from '../../utils/Scene';
import { createGroup } from '../../utils/Group';
import { createCamera } from '../../utils/Camera';
import { addMouseHandler } from '../../utils/MouseHandler';
import { IPosition } from '../../interface';

const REVOLUTION_DURATION = 3650; // ms
const ROTATION_DURATION = 10; // ms

// Basic: Renderer, Camera && Scene

/**
 * Progress
 * 1. - [ ] Object3D of earth
 */

function setCamera(camera: THREE.PerspectiveCamera, position: IPosition) {
  camera.position.set(position.x, position.y, position.z);
}

function init(canvas?: HTMLCanvasElement) {
  // Step 1
  const renderer = createRenderer(canvas);
  // Step 2
  const scene = createScene();
  const earthGroup = createGroup('Earth_Group');
  scene.add(earthGroup);
  // Step 3
  const camera = createCamera(canvas);
  // Step 4
  // scene.add(createLight().ambientLight);
  // camera.add(createLight().spotLight); // fixed light direction by adding it as child of camera
  earthGroup.add(new THREE.AmbientLight(0xffffff));
  // Step 5
  const earth = createEarth('EARTH');
  earthGroup.add(earth);

  renderScene(renderer, scene, camera);
  addMouseHandler(earth);

  return {
    scene,
    camera,
  };
}

window.onload = () => {
  // create the scene
  const obj = init();
  Object.defineProperty(window, 'threeObj', {
    value: obj,
  });
};
