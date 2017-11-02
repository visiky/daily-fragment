import { createBox } from '../classes/box';
import createCavans from '../base/createCanvas';
// import addKeyboradHandle from '../includes/keyborad';
import Box from '../classes/box';
import utils from '../includes/utils';
import Geometry from 'dist/debug-dev/html5-animation/classes/geometry';

const canvas = createCavans();
const context = canvas.getContext('2d');
const BLOCK_WIDTH = canvas.width / 10;
const MOVE_SPEED = 100;
const activeBox = createBlock();

function createBlock(): Box {
  const box: Box = createBox(canvas, {
    width: BLOCK_WIDTH,
    height: BLOCK_WIDTH,
  });
  // boxes.add(box);
  return box;
}

function drawFrame() {
  (window as any).requestAnimationFrame(drawFrame);
  context.clearRect(0, 0, canvas.width, canvas.height);

  moveDown(activeBox, MOVE_SPEED);
  activeBox.draw(context);
}

function moveDown(object: Geometry, offsetY: number) {
  // if (object.y + offsetY + object.height + object.lineWidth >= canvas.height) {
  //   object.y = canvas.height - object.height - object.lineWidth;
  //   // activeBox = createBlock();
  // } else {
  //   object.y += offsetY;
  // }
  object.y += offsetY;
  let canvasGeo = new Box({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  });
  if (!utils.containsObject(canvasGeo, object)) {
    object.y = canvas.height;
  }
  // 删除变量
  canvasGeo = null;
}

export function run() {
  drawFrame();
}
