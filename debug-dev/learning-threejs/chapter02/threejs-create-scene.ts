import * as THREE from 'three';
import { createScene } from '../../utils/Scene';
import { createCamera } from '../../utils/Camera';
import { createPlane } from '../classes/PlaneGeometry';
import { createAmbientLight, createSpotLight } from '../../utils/Lights';
import { createCube } from '../classes/BoxGeometry';
import { createRenderer } from '../../utils/Renderer';
import * as debug from 'debug';
import GUI from '../../utils/Global/Gui';
import { createAxes } from '../../utils/Scene/Axes';
import { PositionController } from '../classes/Controller';
import { createPhongMaterial } from '../../utils/Material';
import { createWoodTexture } from '../../utils/Texture';

const logger = debug('threejs:createScene');
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.Camera;
let plane: THREE.Mesh;
let controls;
let positionController;
class Controller {

  public numberOfObjects: number = scene.children.length;
  public rotationSpeed = 0.02;
  constructor() {
    this.init();
  }

  public addCube = () => {
    const material = createPhongMaterial({
      map: createWoodTexture(),
    });
    const cube = createCube({material});
    cube.castShadow = true;
    cube.name = `cube-${scene.children.length}`;

    const planeGeo = plane.geometry as THREE.PlaneGeometry;
    cube.position.x = plane.position.x - 30 + Math.round((Math.random() * planeGeo.parameters.width));
    cube.position.y = Math.round((Math.random() * 5));
    cube.position.z = plane.position.z - 20 + Math.round((Math.random() * planeGeo.parameters.height));

    scene.add(cube);
    this.numberOfObjects = scene.children.length;
    // return cube;
  }
  public removeCube = () => {
    const allChildren = scene.children;
    const lastObj = allChildren[allChildren.length - 1];
    if (lastObj instanceof THREE.Mesh) {
      scene.remove(lastObj);
      this.numberOfObjects = scene.children.length;
    }
  }

  public outputObjects = () => {
    logger(scene.children);
  }

  private init() {
    const gui = new GUI();
    gui.add(this, 'rotationSpeed', 0, 0.5);
    gui.add(this, 'addCube');
    gui.add(this, 'removeCube');
    gui.add(this, 'outputObjects');
    gui.add(this, 'numberOfObjects').listen();

  }
}

function generatePlane() {
  let _plane: THREE.Mesh;
  _plane = createPlane({
    width: 60,
    height: 40,
    material: new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
    }),
  });
  // 控制地板的位置
  _plane.receiveShadow = true;
  // rotate and position the plane && 调整坐标轴在某一顶点处
  _plane.rotation.x = -0.5 * Math.PI;
  _plane.position.x = 30;
  _plane.position.y = 0;
  _plane.position.z = 20;

  return _plane;
}
/**
 * include createScene, addCamera & addLight
 */
function initScene() {
  renderer = createRenderer();
  // 重新调整renderer
  renderer.setClearColor(new THREE.Color(255, 255, 255));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  scene = createScene();
  // 添加相机
  camera = createCamera();
  scene.add(camera);

  // 添加坐标
  const axes = createAxes();
  scene.add(axes);

  // 添加矩形地板
  plane = generatePlane();
  scene.add(plane);

  const ambientLight = createAmbientLight({
    color: 0x0c0c0c,
  });
  scene.add(ambientLight);
  const spotLight = createSpotLight({
    color: 0xffffff,
  });
  // 调整位置 - 不然无法显示材质
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  return scene;
}

/**
 * 添加相机位置控制器
 */
function adjustCameraPosiiton(_camera: THREE.Camera|THREE.PerspectiveCamera) {
  _camera.position.x = positionController.positionX;
  _camera.position.y = positionController.positionY;
  _camera.position.z = positionController.positionZ;
  _camera.lookAt(scene.position);
}

function render() {
  adjustCameraPosiiton(camera);
  // position and point the camera to the center of the scene

  // rotate the cubes around its axes
  scene.traverse(e => {
    if (e instanceof THREE.Mesh && e !== plane) {
      e.rotation.x += controls.rotationSpeed;
      e.rotation.y += controls.rotationSpeed;
      e.rotation.z += controls.rotationSpeed;
    }
  });

  // render using requestAnimationFrame
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

export function run() {
  initScene();
  controls = new Controller();
  positionController = new PositionController('相机位置控制器');
  render();
}
