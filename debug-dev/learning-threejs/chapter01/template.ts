import { createScene } from '../utils/Scene';
import { createRenderer } from '../utils/Renderer';
import { createCamera } from '../utils/Camera';
import Gui from '../utils/Global/Gui';
// import { createBall } from '../classes/SphereGeometry';
// import { createPlane } from '../classes/PlaneGeometry';
// import { createSpotLight } from '../utils/Lights';
import debug from 'debug';
import { createAxes } from '../utils/Scene/Axes';

const logger = debug('threejs:usingDatGUI');
logger();

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera();

let cameraController;
export function run() {

  const axes = createAxes();
  scene.add(axes);
  // 1. 告诉渲染器我们需要阴影
  // 2. 明确哪些物体接受阴影
  // 3. 明确哪些物体产生投影
  // renderer.shadowMap.enabled = true;
  // const ball = createBall();
  // const plane = createPlane();
  // plane.receiveShadow = true;
  // ball.castShadow = true;
  // scene.add(ball);
  // scene.add(plane);
  // // 4. 并不是所有的光源都可以产生投影 - 这里使用spotLight
  // const spotLight = createSpotLight();
  // spotLight.castShadow = true;
  // scene.add(spotLight);

  createControl('Controller', {
    rotationSpeed: {
      value: 0.02,
      range: [0, 0.5],
    },
    bouncingSpeed: {
      value: 0.02,
      range: [0, 0.5],
    },
  });
  cameraController = createControl('cameraController', {
    positionX: {
      value: -30,
      range: [-500, 500],
    },
    positionY: {
      value: 40,
      range: [-500, 500],
    },
    positionZ: {
      value: 30,
      range: [-500, 500],
    },
  });
  renderScene();
}

function renderScene() {
  requestAnimationFrame(renderScene);
  camera.position.x = cameraController.positionX;
  camera.position.y = cameraController.positionY;
  camera.position.z = cameraController.positionZ;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

function createControl(name: string, options: {
  [type: string]: {
    value: any;
    range: any[];
  },
} = {}) {
  const keys = Object.keys(options);
  class Control {
    constructor() {
      keys.forEach(key => {
        const option = options[key];
        this[key] = option.value;
      });
      this[name] = () => {};
    }
  }

  const controls = new Control();
  const gui = new Gui();
  gui.add(controls, name);
  keys.forEach(key => {
    const option = options[key];
    gui.add(controls, key, option.range[0], option.range[1]);
  });
  return controls;
}
