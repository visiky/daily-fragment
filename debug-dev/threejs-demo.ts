import * as convexGeometry from './learning-threejs/chapter06/convexGeometry';
import * as usingDatGUI from './learning-threejs/chapter01/beginner-add-datGUI';
import * as createThreeScene from './learning-threejs/chapter02/threejs-create-scene';
import * as geometries from './learning-threejs/chapter02/geometories';

const chapter2 = {
  createThreeScene,
  geometries,
};
const chapter1 = {
  usingDatGUI,
};

const chapter6 = {
  convexGeometry,
};

const MODULES: {
  [chapterName: string]: {
    [moduleName: string]: {
      run: () => void;
    },
  },
} = {
  chapter1,
  chapter2,
  chapter6,
};

function start() {
  const key = localStorage.getItem('threejs-demo').split('/');
  const chapterName = key[0];
  const moduleName = key[1];

  if (chapterName && moduleName && MODULES[chapterName][moduleName]) {
    MODULES[chapterName][moduleName].run();
  }
}

start();
