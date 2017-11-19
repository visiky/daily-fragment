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
import { createText } from './learning-threejs/classes/TextGeometry';
import COUNTRIES from './fanscape_assets/location/country';
import { createPlane } from './learning-threejs/classes/PlaneGeometry';

const logger = debug('fanscape');

let firstLoading = true;
let CANVAS_WIDTH = window.innerWidth;
let CANVAS_HEIGHT = window.innerHeight;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controller: Controller;
const metetors = new Set<THREE.Sprite>();
// 关于camare的一些参数
const CAMERA_FAR = 1000;
const CAMERA_FOV = 90; // 视角
// 关于地球的一些参数
const EARTH_RADIUS = 100;

/**
 * @desc 画一个地球 🌍
 */
class Earth {
  public instance: THREE.Mesh;

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

  private getMaterial() {
    const material = createPhongMaterial({
      color: 0xffffff,
      map: getTexture('fanscape/earth.jpg'),
      // 调节镜面反射
      // specularMap: getTexture('fanscape/earth_spec.jpg'),
      // specular: new THREE.Color('#909090'),
      // 混合
      // blending: THREE.AdditiveBlending,
      transparent: true,
      shininess: 5,
      // 隆起物 @see https://threejs.org/examples/?q=bump#webgl_materials_bumpmap_skin
      bumpMap: getTexture('fanscape/earth_bump.jpg'),
    });
    return material;
  }
}

/**
 * @desc Create a Star Sky
 */
class StarSky {
  public instance: THREE.Mesh;

  private materialBumpScale: number = 0;
  constructor() {
    this.init();
  }

  public init() {
    const sky = createPlane({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      material: this.getMaterial(),
    });

    this.instance = sky;
  }

  public setBumpScale(scale: number) {
    this.materialBumpScale = scale;
  }

  private getMaterial() {
    const material = createPhongMaterial({
      color: 0xffffff,
      map: getTexture('fanscape/bg-stars.jpg'),
      // 调节镜面反射
      // specularMap: getTexture('fanscape/earth_spec.jpg'),
      // specular: new THREE.Color('#909090'),
      // 混合
      // blending: THREE.AdditiveBlending,
      shininess: 5,
      // 隆起物 @see https://threejs.org/examples/?q=bump#webgl_materials_bumpmap_skin
      // bumpMap: getTexture('fanscap/bg-stars.jpg'),
      // earthRadius: this.materialBumpScale,
      // depthTest: false,
      // depthWrite: false,
    });
    return material;
  }
}

function createCloud() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_RADIUS + 5, 40, 40),
    new THREE.MeshPhongMaterial({
      map: getTexture('fanscape/earth_cloud.png'),
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
  public cameraZ: number = 4 * EARTH_RADIUS / Math.sin(Math.PI / 180 * (CAMERA_FOV / 2));
  // MeteorControl
  public meteorZ: number = 15;
  // LightControl
  public ambientColor = '#bddff7';
  public ambientIntensity: number = 0.95;
  // EarthContorl && EarthGroupControl
  public positionX: number = 0;
  public positionY: number = 0;
  public positionZ: number = 0;
  public earthRadius: number = EARTH_RADIUS;
  public earthRotateSpeed = 0;
  // textControl
  public fontSize: number = 3;
  public fontHeight: number = 3;
  private gui: GUI;
  constructor() {
    this.init();

    this.addCameraControl();
    this.addLightControl();
    this.addEarthControl();
    this.addMeteorControl();
    // this.addTextControl();
  }

  public outputObjects = () => {
    logger(scene.children);
  }

  private init() {
    this.gui = new GUI();
    this.gui.add(this, 'outputObjects');
  }

  private addTextControl() {
    const textControl = this.gui.addFolder('字体控制器');
    textControl.add(this, 'fontSize', 0, 30).onChange();
    textControl.add(this, 'fontHeight', 0, 30).onChange();
  }
  private addMeteorControl() {
    const meteorControl = this.gui.addFolder('流星控制器');
    meteorControl.add(this, 'meteorZ', -1000, 1000).onChange();
  }
  private addEarthControl() {
    const earthControl = this.gui.addFolder('地球控制器');
    earthControl
    .add(this, 'positionX', -CANVAS_WIDTH, CANVAS_WIDTH)
    .onChange();
    earthControl
      .add(this, 'positionY', -CANVAS_HEIGHT, CANVAS_HEIGHT)
      .onChange();
    earthControl
      .add(this, 'positionZ', -50, 350)
      .listen();
    earthControl.add(this, 'earthRadius', 0, EARTH_RADIUS * 10).onChange();
    earthControl.add(this, 'earthRotateSpeed', 0, Math.PI / 100).onChange();
  }
  private addLightControl() {
    const lightControl = this.gui.addFolder('灯光控制器');
    lightControl.addColor(this, 'ambientColor').onChange();
    lightControl.add(this, 'ambientIntensity', 0, 1).onChange();
  }
  private addCameraControl() {
    const cameraControl = this.gui.addFolder('相机位置控制器');
    cameraControl
      .add(this, 'cameraZ', 0, 5 * CANVAS_WIDTH)
      .onChange();
  }
}

function run(font) {
  logger();
  // Add Controller
  // 控制器
  controller = new Controller();

  renderer = createRenderer(canvas, {
    clearColor: new THREE.Color(0x000),
  });
  scene = createScene();
  camera = createCamera(null, {
    fov: CAMERA_FOV,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: CAMERA_FAR,
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
  // Add Sky
  const sky = new StarSky();
  scene.add(sky.instance);

  // 添加字体
  // const texts = new Set<THREE.Mesh>();
  // function loadFont() {
  // _.map(COUNTRIES, country => {
  //   const text = createText(country.name, {
  //     size: controller.fontSize,
  //     height: controller.fontHeight,
  //     font,
  //   });
  //   // FIX 位置不够准确
  //   text.position.x = country.position.x;
  //   text.position.y = country.position.y;
  //   text.position.z = country.position.z;
  //   texts.add(text);
  //   earthGroup.add(text);
  // });
    // }
  // 添加一束基本光照，为当前场景添加白色
  const ambientLight = createAmbientLight({
    color: controller.ambientColor,
    intensity: controller.ambientIntensity,
  });
  scene.add(ambientLight);
  const light = createDirectionalLight({
    color: 0xffffff,
  });
  scene.add(light);

  (function render() {
    if (firstLoading && controller.positionZ <= 350) {
      controller.positionZ += Math.random() * 6;
    } else if (firstLoading) {
      firstLoading = false;
    }

    // TODO 完善
    (earth.instance.geometry as THREE.SphereGeometry).parameters.radius = controller.earthRadius;
    earthGroup.rotation.y += controller.earthRotateSpeed;
    earthGroup.position.x = controller.positionX;
    earthGroup.position.y = controller.positionY;
    earthGroup.position.z = controller.positionZ;

    camera.position.z = controller.cameraZ;
    camera.fov = CAMERA_FOV;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    ambientLight.color = new THREE.Color(controller.ambientColor);
    ambientLight.intensity = controller.ambientIntensity;

    metetors.forEach(metetor => {
      metetor.position.z = controller.meteorZ;
    });

    requestAnimationFrame(render);
    // 添加流星运动
    moveMeteor();
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene, camera);
  })();
  // Automatic resize
  function onResize(e) {
    // 设置镜头随着resize移动
    controller.cameraZ += CANVAS_WIDTH - window.innerWidth;
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
function addMeteor() {
  const material = new THREE.SpriteMaterial({
    map: getTexture('fanscape/bg_meteor.png'),
    color: 0xffffff,
  });
  for (let i = 0; i < Math.random() * 10 + 5; i++) {
    const sprite = new THREE.Sprite(material);
    sprite.position.set(
      (1 - (Math.random() * 2)) * CANVAS_WIDTH,
      (1 - (Math.random() * 2)) * CANVAS_HEIGHT,
      controller.meteorZ,
    );
    sprite.scale.set(100, 100, 100);
    metetors.add(sprite);
    scene.add(sprite);
  }
}

function moveMeteor() {
  const speed = _.random(2, 4);
  if (metetors.size === 0) {
    addMeteor();
  } else {
    metetors.forEach(meteor => {
      const meteorX = meteor.position.x;
      const meteorY = meteor.position.y;
      if (meteorX < -CANVAS_WIDTH / 2 || meteorY < -CANVAS_HEIGHT / 2) {
        clearMeteor(meteor);
      } else {
        meteor.position.x -= speed;
        meteor.position.y -= speed;
      }
    });
  }
}

function clearMeteor(metetor: THREE.Sprite) {
  scene.remove(metetor);
  metetors.delete(metetor);
}

new THREE.FontLoader().load('./assets/fonts/gentilis_regular.typeface.json', font => {
  run(font);
  addMeteor();
  logger(metetors);
});
