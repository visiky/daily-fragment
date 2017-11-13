import { createScene } from '../utils/Scene';
import { createRenderer } from '../utils/Renderer';
import { createCamera } from '../utils/Camera';

export function run() {
  const renderer = createRenderer();
  const scene = createScene();
  const camera = createCamera();

  renderer.render(scene, camera);
}
