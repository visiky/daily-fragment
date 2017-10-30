import * as THREE from 'three';
import { IMAGE_BASEURL } from './configs/constants';

// 用Three.js创建一个纹理映射立方体
// tslint:disable-next-line:one-variable-per-declaration
let renderer = null,
  scene = null,
  camera = null,
  cube = null;
const duration = 5000; // ms
let currentTime = Date.now();
function animate() {
  const now = Date.now();
  const deltat = now - currentTime;
  currentTime = now;
  const fract = deltat / duration;
  const angle = Math.PI * 2 * fract;
  cube.rotation.y += angle;
}
function run() {
  requestAnimationFrame(() => {
    run();
  });
  // Render the scene
  renderer.render(scene, camera);
  // Spin the cube for next frame
  animate();
}
onload = () => {
  let canvas = document.getElementById('webglcanvas') as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
  }
  // create THREE.js renderer and add to canvas
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  // set backgroundColor of Renderer
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  // set the viewport Size
  renderer.setSize(canvas.width, canvas.height);
  // create a new scene of ThreeJS
  scene = new THREE.Scene();
  // NOTE ADD Axes
  const axes = new THREE.AxisHelper(20);
  scene.add(axes);
  // add a camera so as to see the scene
  camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    1,
    4000,
  );
  scene.add(camera);
  // Create a texture-mapped cube and add it to the scene
  // First, create the texture map
  const mapUrl = `${IMAGE_BASEURL}/crate.jpg`;
  const map = THREE.ImageUtils.loadTexture(mapUrl);
  // Now, create a Basic material; pass in the map
  const material = new THREE.MeshBasicMaterial({
    map,
  });
  // Create the cube geometry
  const geometry = new THREE.CubeGeometry(2, 2, 2);
  // And put the geometry and material together into a mesh
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = -10;
  cube.position.y = 3;
  cube.position.z = 0;
  // NOTE set the position of cameara
  camera.position.x = -50;
  camera.position.y = 20;
  camera.position.z = 20;
  camera.lookAt(scene.position);
  // Finally, add the mesh to our scene
  scene.add(cube);
  // Run the run loop
  run();
};
