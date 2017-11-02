import * as rotateToMouse from './html5-animation/chapter03/rotate-to-mouse';
import * as pluse from './html5-animation/chapter03/pluse';
import * as random from './html5-animation/chapter03/random';
import * as sineWave from './html5-animation/chapter03/sine-wave';
import * as easing01 from './html5-animation/chapter08/easing-1';
import * as easing02 from './html5-animation/chapter08/easing-2';
import * as easingToMouse from './html5-animation/chapter08/easing-to-mouse';
import * as chainSpring from './html5-animation/chapter08/chain-spring';
import * as tripleSpring from './html5-animation/chapter08/triple-spring';
import * as multiSpring from './html5-animation/chapter08/multi-spring';
import * as tetris from './html5-animation/chapter09/tetris';

// 引入模块
const chapter3 = {
  rotateToMouse,
  pluse,
  random,
  sineWave,
};

const chapter8 = {
  easing01,
  easing02,
  easingToMouse,
  tripleSpring,
  multiSpring,
  chainSpring,
};

const chapter9 = {
  tetris,
};

const MODULES: {
  [chapterName: string]: {
    [moduleName: string]: {
      run: () => void;
    },
  },
} = {
  chapter3,
  chapter8,
  chapter9,
};

function start() {
  const key = localStorage.getItem('html5-animation').split('/');
  const chapterName = key[0];
  const moduleName = key[1];

  if (chapterName && moduleName && MODULES[chapterName][moduleName]) {
    MODULES[chapterName][moduleName].run();
  }
}

start();
