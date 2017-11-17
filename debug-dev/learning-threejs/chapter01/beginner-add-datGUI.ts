import { createScene } from '../../utils/Scene';
import { createRenderer } from '../../utils/Renderer';
import { createCamera } from '../../utils/Camera';
import { PositionController } from '../classes/Controller';
import debug from 'debug';
import { createAxes } from '../../utils/Scene/Axes';

const logger = debug('threejs:usingDatGUI');
logger();

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera();

let cameraController;
export function run() {

  const axes = createAxes();
  scene.add(axes);
  cameraController = new PositionController('cameraController');
  renderScene();
}

function renderScene() {
  requestAnimationFrame(renderScene);
  // 改变相机的视角
  camera.position.x = cameraController.positionX;
  camera.position.y = cameraController.positionY;
  camera.position.z = cameraController.positionZ;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
