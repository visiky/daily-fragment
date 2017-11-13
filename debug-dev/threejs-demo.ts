import * as convetGeometry from './learning-threejs/chapter06/convexGeometry';
import * as usingDatGUI from './learning-threejs/chapter01/beginner-add-datGUI';

const chapter1 = {
  usingDatGUI,
};

const chapter6 = {
  convetGeometry,
};

const MODULES: {
  [chapterName: string]: {
    [moduleName: string]: {
      run: () => void;
    },
  },
} = {
  chapter1,
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
