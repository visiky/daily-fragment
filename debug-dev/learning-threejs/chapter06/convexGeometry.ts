import * as THREE from 'three';
import { createRenderer } from '../utils/Renderer';
import { createCamera } from '../utils/Camera';
import { createAxes } from '../utils/Scene/Axes';

/**
 * @todo 还没完成
 */

let renderer;
let scene;
let camera;
export function run() {
  renderer = createRenderer();
    // 重新调整renderer
  renderer.setClearColor(new THREE.Color(255, 255, 255));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  scene = new THREE.Scene();

  const axes = createAxes();
  scene.add(axes);

  camera = createCamera();
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100;
  scene.add(camera);
  camera.lookAt(scene.position);

  // HERE ADD YOUR CODE
  // HERE END YOUR CODE

  // 渲染
  render();
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
