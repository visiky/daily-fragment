import debug from 'debug';
import * as _ from 'lodash';
import { parseColor } from './utils';
import { createScene } from './utils/Scene';
import { createRenderer } from './utils/Renderer';
import { createCamera } from './utils/Camera';
import { createSphereGeometry } from './learning-threejs/classes/SphereGeometry';
import { createPhongMaterial } from './utils/Material';
import * as THREE from 'three';
import { createDirectionalLight, createAmbientLight } from './utils/Lights';
import { getTexture } from './utils/Texture';
import GUI from './utils/Global/Gui';
import { addMouseHandler } from './utils/MouseHandler';
import { createMesh } from './learning-threejs/classes/createCommonMesh';

const logger = debug('fanscape');

let CANVAS_WIDTH = window.innerWidth;
let CANVAS_HEIGHT = window.innerHeight;
const EARTH_RADIUS = CANVAS_WIDTH / 6;
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
  public instance: THREE.Mesh;

  private materialBumpScale: number = 0;
  constructor() {
    this.init();
  }

  public init() {
    const sphereGeo = createSphereGeometry({
      radius: EARTH_RADIUS,
    });
    const material = this.getMaterial();
    const earth = new THREE.Mesh(sphereGeo, material);

    this.instance = earth;
  }

  public setBumpScale(scale: number) {
    this.materialBumpScale = scale;
  }

  private getMaterial() {
    const material = createPhongMaterial({
      color: 0xffffff,
      map: getTexture('x-plan/earth.jpg'),
      // 调节镜面反射
      // specularMap: getTexture('x-plan/earth_spec.jpg'),
      // specular: new THREE.Color('#909090'),
      // 混合
      // blending: THREE.AdditiveBlending,
      transparent: true,
      shininess: 5,
      // 隆起物 @see https://threejs.org/examples/?q=bump#webgl_materials_bumpmap_skin
      bumpMap: getTexture('x-plan/earth_bump.jpg'),
      bumpScale: this.materialBumpScale,
    });
    return material;
  }
}

function createCloud() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_RADIUS + 10, 40, 40),
    new THREE.MeshPhongMaterial({
      map: getTexture('x-plan/earth_cloud.png'),
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    }),
  );
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
  public positionZ: number = 800;
  // LightControl
  public ambientColor = '#a6bdcd';
  public ambientIntensity: number = 0.5;
  // EarthContorl
  public bumpScale: number = 0;
  public earthRotateSpeed = Math.PI / 500;
  private gui: GUI;
  constructor() {
    this.init();

    this.addCameraControl();
    this.addLightControl();
    this.addEarthControl();
  }

  public outputObjects = () => {
    logger(scene.children);
  };

  private init() {
    this.gui = new GUI();
    this.gui.add(this, 'outputObjects');
  }

  private addEarthControl() {
    const earthControl = this.gui.addFolder('地球控制器');
    earthControl.add(this, 'bumpScale', 0, 1).onChange();
    earthControl.add(this, 'earthRotateSpeed', 0, Math.PI / 100).onChange();
  }
  private addLightControl() {
    const lightControl = this.gui.addFolder('灯光控制器');
    lightControl.addColor(this, 'ambientColor').onChange();
    lightControl.add(this, 'ambientIntensity', 0, 1).onChange();
  }
  private addCameraControl() {
    const cameraControl = this.gui.addFolder('相机位置控制器');
    const contX = cameraControl
      .add(this, 'positionX', -CANVAS_WIDTH, CANVAS_WIDTH)
      .onChange();
    const contY = cameraControl
      .add(this, 'positionY', -CANVAS_HEIGHT, CANVAS_HEIGHT)
      .onChange();
    const contZ = cameraControl
      .add(this, 'positionZ', 0, 5 * CANVAS_WIDTH)
      .onChange();
  }
}

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
  const earthGroup = new THREE.Group();
  const earth = new Earth();
  const earthInst = earth.instance;
  earthGroup.add(earthInst);
  const cloud = createCloud();
  earthGroup.add(cloud);
  scene.add(earthGroup);

  // 添加一束基本光照，为当前场景添加白色
  const ambientLight = createAmbientLight({
    color: controller.ambientColor,
    intensity: controller.ambientIntensity,
  });
  scene.add(ambientLight);
  // const light = createDirectionalLight({
  //   color: 0xffffff,
  // });
  // scene.add(light);

  (function render() {
    earth.setBumpScale(controller.bumpScale);
    earthGroup.rotation.y += controller.earthRotateSpeed;

    camera.position.x = controller.positionX;
    camera.position.y = controller.positionY;
    camera.position.z = controller.positionZ;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    ambientLight.color = new THREE.Color(controller.ambientColor);
    ambientLight.intensity = controller.ambientIntensity;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  })();
  // Automatic resize
  function onResize(e) {
    // 设置镜头随着resize移动
    controller.positionZ += CANVAS_WIDTH - window.innerWidth;
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize, false);
  /**
   * @todo 修改鼠标操作几何体 只有在几何图体上才可以操作
   */
  addMouseHandler(earthGroup, canvas);
}

/**
 * @desc 添加地理位置
 */
function addLocationSprite() {
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

run();

const options = {
  size: 90,
  height: 90,
  weight: 'normal',
  style: 'normal',
  color: 0xfff,
  bevelThickness: 2,
  bevelSize: 4,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1,
};
// the createMesh is the same function we saw earlier
const text1 = createMesh(new THREE.TextGeometry( 'Hello three.js!', options));
text1.position.z = -100;
text1.position.y = 100;
scene.add(text1);
