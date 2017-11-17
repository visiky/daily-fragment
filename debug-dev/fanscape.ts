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

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
// 灯光
let ambientLight: THREE.AmbientLight;

function run() {
  logger();
  renderer = createRenderer(canvas, {
    clearColor: new THREE.Color(0x000),
  });
  scene = createScene();
  camera = createCamera(null, {
    aspect: window.innerWidth / window.innerHeight,
  });
  scene.add(camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Add Object
  const earth = new Earth().earth;
  scene.add(earth);

  // 添加一束基本光照，为当前场景添加白色
  ambientLight = createAmbientLight({
    hex: 0x5291eb,
    intensity: 0.6,
  });
  scene.add(ambientLight);
  // const light = createDirectionalLight({
  //   color: 0xffffff,
  // });
  // scene.add(light);

  render();
  // Add Controller
  new Controller();
  // Automatic resize
  window.addEventListener('resize', onResize, false);
}
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
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
      radius: 150,
    });
    const material = createPhongMaterial({
      color: 0xffffff,
      map: getTexture('x-plan/earth.jpg'),
      // specularMap: getTexture('x-plan/earth_spec.jpg'),
      // specular: new THREE.Color(0x4444aa),
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
export class Controller {

  // 一定要设置默认值
  public positionX: number = 0;
  public positionY: number = 0;
  public positionZ: number = 600;
  public ambientColor: THREE.Color = new THREE.Color(0xffffff);
  public ambientIntensity: number = 1;
  private gui: GUI;
  constructor() {
    this.init();

    this.addCameraControl();
    this.addLightControl();
  }

  public outputObjects = () => {
    logger(scene.children);
  }

  private init() {
    this.gui = new GUI();
    this.gui.add(this, 'outputObjects');
  }

  private addLightControl() {
    const lightControl = this.gui.addFolder('灯光控制器');
    lightControl.addColor(this, 'ambientColor').onChange(e => {
      ambientLight.color = new THREE.Color(e);
    });
    lightControl.add(this, 'ambientIntensity', 0, 1).onChange(e => {
      ambientLight.intensity = e;
    });
  }
  private addCameraControl() {
    const cameraControl = this.gui.addFolder('相机位置控制器');
    const contX = cameraControl.add(this, 'positionX', -CANVAS_WIDTH, CANVAS_WIDTH);
    const contY = cameraControl.add(this, 'positionY', -CANVAS_HEIGHT, CANVAS_HEIGHT);
    const contZ = cameraControl.add(this, 'positionZ', 0, 5 * CANVAS_WIDTH);

    camera.position.x = this.positionX;
    camera.position.y = this.positionY;
    camera.position.z = this.positionZ;

    contX.onChange(value => {
      this.positionX = value;
      camera.position.x = this.positionX;
    });

    contY.onChange(value => {
      this.positionY = value;
      camera.position.y = this.positionY;
    });

    contZ.onChange(value => {
      this.positionZ = value;
      camera.position.z = this.positionZ;
    });
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

run();
