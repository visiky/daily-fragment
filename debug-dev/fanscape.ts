import debug from 'debug';
import { createScene } from './utils/Scene';
import { createRenderer } from './utils/Renderer';
import { createCamera } from './utils/Camera';
import { createSphereGeometry } from './learning-threejs/classes/SphereGeometry';
import { createPhongMaterial } from './utils/Material';
import * as THREE from 'three';
import { createDirectionalLight, createAmbientLight } from './utils/Lights';
import { getTexture } from './utils/Texture';
import GUI from './utils/Global/Gui';

const logger = debug('fanscape');

let CANVAS_WIDTH = window.innerWidth;
let CANVAS_HEIGHT = window.innerHeight;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

/**
 * @desc 画一个地球 🌍
 */
class Earth {
  public earth: THREE.Mesh;

  constructor() {
    this.init();
  }

  public init() {
    const sphereGeo = createSphereGeometry({
      radius: CANVAS_WIDTH / 4,
    });
    const material = createPhongMaterial({
      color: 0xffffff,
      map: getTexture('x-plan/earth.jpg'),
      specularMap: getTexture('x-plan/earth_spec.jpg'),
      specular: new THREE.Color(0x4444aa),
      // 混合
      // blending: THREE.AdditiveBlending,
      // transparent: true,
      // 隆起物 @see https://threejs.org/examples/?q=bump#webgl_materials_bumpmap_skin
      enableBump: false,
      bumpMap: getTexture('/x-plan/earth_bump.jpg'),
      bumpScale: 8,
    });
    const earth = new THREE.Mesh(sphereGeo, material);
    earth.position.z = -100;
    this.earth = earth;
  }
}

// function addAxes() {
//   // 添加坐标
//   const axes = createAxes();
//   scene.add(axes);
// }

/**
 * @todo 迁移出去
 */
class Controller {
  // 一定要设置默认值
  // CameraControl
  public positionX: number = 0;
  public positionY: number = 0;
  public positionZ: number = 1300;
  // LightControl
  public ambientColor: THREE.Color = new THREE.Color(0x146a8e);
  public ambientIntensity: number = 0.5;
  // EarthContorl
  public enableBump: boolean = false;
  private gui: GUI;
  constructor() {
    this.init();

    this.addCameraControl();
    this.addLightControl();
    this.addEarthControl();
  }

  public outputObjects = () => {
    logger(scene.children);
  }

  private init() {
    this.gui = new GUI();
    this.gui.add(this, 'outputObjects');
  }

  private addEarthControl() {
    const earthControl = this.gui.addFolder('地球控制器');
    earthControl.add(this, 'enableBump', ['false', 'true']).onChange(e => {
      // this.enableBump =
    });
  }
  private addLightControl() {
    const lightControl = this.gui.addFolder('灯光控制器');
    lightControl.addColor(this, 'ambientColor').onChange(e => {
      this.ambientColor = new THREE.Color(e);
    });
    lightControl.add(this, 'ambientIntensity', 0, 1).onChange();
  }
  private addCameraControl() {
    const cameraControl = this.gui.addFolder('相机位置控制器');
    const contX = cameraControl.add(
      this,
      'positionX',
      -CANVAS_WIDTH,
      CANVAS_WIDTH,
    ).onChange();
    const contY = cameraControl.add(
      this,
      'positionY',
      -CANVAS_HEIGHT,
      CANVAS_HEIGHT,
    ).onChange();
    const contZ = cameraControl.add(this, 'positionZ', 0, 5 * CANVAS_WIDTH).onChange();
  }
}

function onResize(e) {
  // 设置镜头随着resize移动
  camera.position.z += CANVAS_WIDTH - window.innerWidth;

  CANVAS_WIDTH = window.innerWidth;
  CANVAS_HEIGHT = window.innerHeight;
  camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * === add MouseHandler START ===
 * @todo
 */

function onMouseDown(event) {
  event.preventDefault();

  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseOut, false);

  // mouseOnDown.x = -event.clientX;
  // mouseOnDown.y = event.clientY;

  // targetOnDown.x = target.x;
  // targetOnDown.y = target.y;

  canvas.style.cursor = 'move';
}

function onMouseMove(event) {
  logger('mouseMove');
  // mouse.x = -event.clientX;
  // mouse.y = event.clientY;

  // var zoomDamp = distance / 1000;

  // target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
  // target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

  // target.y = target.y > PI_HALF ? PI_HALF : target.y;
  // target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
}

function onMouseUp(event) {
  logger('onMouseUp');
  canvas.removeEventListener('mousemove', onMouseMove, false);
  canvas.removeEventListener('mouseup', onMouseUp, false);
  canvas.removeEventListener('mouseout', onMouseOut, false);
  canvas.style.cursor = 'auto';
}

function onMouseOut(event) {
  logger('onMouseOut');
  canvas.removeEventListener('mousemove', onMouseMove, false);
  canvas.removeEventListener('mouseup', onMouseUp, false);
  canvas.removeEventListener('mouseout', onMouseOut, false);
}

function onMouseWheel(event) {
  logger('onMouseWheel');
  event.preventDefault();
  // if (overRenderer) {
  //   zoom(event.wheelDeltaY * 0.3);
  // }
  return false;
}
/**
 * === add MouseHandler END ===
 */

function run() {
  logger();
  // Add Controller
  // 控制器
  const controller = new Controller();

  renderer = createRenderer(canvas, {
    clearColor: new THREE.Color(0x000),
  });
  scene = createScene();
  camera = createCamera(null, {
    aspect: window.innerWidth / window.innerHeight,
  });
  scene.add(camera);

  // Add Object
  const earth = new Earth().earth;
  scene.add(earth);

  // 添加一束基本光照，为当前场景添加白色
  const ambientLight = createAmbientLight({
    hex: controller.ambientColor,
    intensity: controller.ambientIntensity,
  });
  scene.add(ambientLight);
  // const light = createDirectionalLight({
  //   color: 0xffffff,
  // });
  // scene.add(light);

  (function render() {
    earth.rotation.y += Math.PI / 500 * 4;

    camera.position.x = controller.positionX;
    camera.position.y = controller.positionY;
    camera.position.z = controller.positionZ;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    ambientLight.color = controller.ambientColor;
    ambientLight.intensity = controller.ambientIntensity;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  })();
  // Automatic resize
  window.addEventListener('resize', onResize, false);
}

run();
