import * as THREE from 'three';
/**
 * @desc Add WebGL compatibility check
 * @see https://threejs.org/docs/index.html#manual/introduction/WebGL-compatibility-check
 */
if (!(window as any).Detector.webgl) {
  (window as any).addGetWebGLMessage();
}

import { IMAGE_BASEURL } from './configs/constants';

let container: HTMLDivElement;

// tslint:disable-next-line:one-variable-per-declaration
let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;

function init() {
  container = document.createElement('div');
  container.style.position = 'relative';
  document.body.insertBefore(container, document.body.lastChild);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000,
  );

  scene = new THREE.Scene();

  // tslint:disable-next-line:one-variable-per-declaration
  let light: THREE.Light, object: THREE.Object3D;
  scene.add(new THREE.AmbientLight(0x404040));

  light = new THREE.DirectionalLight(0xfffffff);

  // create Texture Mapping
  const map: THREE.Texture = new THREE.TextureLoader().load(
    `${IMAGE_BASEURL}/UV_Grid_Sm.jpg`,
  );

  // create Material
  const material: THREE.Material = new THREE.MeshLambertMaterial({
    map,
    side: THREE.DoubleSide,
  });

  // create Geometry Object
  object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material);
  object.position.set(-250, 0, 250);
  // Add object to scene
  scene.add(object);

  // create Geometry Object
  object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 2, 2), material);
  object.position.set(-50, 0, -50);
  // Add object to scene
  scene.add(object);

  // create Geometry Object
  object = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100, 3, 2, 1),
    new THREE.MeshBasicMaterial({
      map,
      wireframe: true,
    }),
  );
  object.position.set(-150, 0, 100);
  // Add object to scene
  scene.add(object);

  // create Geometry Object
  object = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 50), material);
  object.position.set(-150, 0, -100);
  // Add object to scene
  scene.add(object);

  // create Geometry Object
  object = new THREE.Mesh(new THREE.TorusKnotGeometry(30), material);
  object.position.set(-150, 0, -150);
  // Add object to scene
  scene.add(object);

  // create Geometry Object
  object = new THREE.Mesh(new THREE.OctahedronGeometry(50, 1), material);
  object.position.set(-150, 0, -300);
  // Add object to scene
  scene.add(object);

  object = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    50,
  );
  object.position.set(400, 0, -200);
  scene.add(object);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor('#DEFFF3');
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  // Add JS Performance Monitor
  const stats = initStats();
  animate(stats);

  // listent window Resize Event
  window.addEventListener('resize', onWindowResize, false);
}

function initStats() {
  const stats = new (window as any).Stats();
  stats.setMode(0);
  container.appendChild(stats.domElement);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  return stats;
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(stats?) {
  if (stats && stats.update) {
    stats.update();
  }
  requestAnimationFrame(animate);
  render();
}

function render() {
  const timer = Date.now() * 0.0001;
  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800;
  // 使相机随着scene旋转
  camera.lookAt(scene.position);
  for (let i = 0, l = scene.children.length; i < l; i += 1) {
    const object = scene.children[i];
    object.rotation.x = timer * 5;
    object.rotation.y = timer * 2.5;
  }
  renderer.render(scene, camera);
}

/**
 * Start the application
 */
init();
