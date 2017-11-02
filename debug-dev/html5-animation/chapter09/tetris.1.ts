import { createBox } from '../classes/box';
import createCavans from '../base/createCanvas';
import addKeyboradHandle from '../includes/keyborad';
import Box from 'dist/debug-dev/html5-animation/classes/box';
import utils from '../includes/utils';

// TODO: 判断碰撞
const canvas = createCavans();
const context = canvas.getContext('2d');
const boxes: Set<Box> = new Set();
let activeBox = createBlock();

// 运动相关
let isInControl = false;
const BLOCK_WIDTH = canvas.width / 10;
const MOVE_SPEED = BLOCK_WIDTH / (1000 / 16);

function drawFrame() {
  (window as any).requestAnimationFrame(drawFrame);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!isInControl) {
    moveDown(activeBox, MOVE_SPEED);
  }
  activeBox.setPosition(0, 0);
  addKeyboradHandle(canvas, eventType => {
    if (/^on/.test(eventType)) {
      isInControl = true;
      switch (eventType) {
        case 'onArrowUp':
        break;
        case 'onArrowDown':
        moveDown(activeBox, BLOCK_WIDTH);
        break;
        case 'onArrowRight':
        moveRight(activeBox, BLOCK_WIDTH);
        break;
        case 'onArrowLeft':
        moveLeft(activeBox, BLOCK_WIDTH);
        break;
        default:
        break;
      }
    } else {
      isInControl = false;
    }
  });
  boxes.forEach(drawBox);
}

function drawBox(box) {
  if (activeBox !== box && utils.intersects(activeBox, box)) {
    activeBox.y = box.y - activeBox.height;
    activeBox = createBlock();
  }
  box.draw(context);
}

function moveDown(object: Box, offsetY: number) {
  if (object.y + offsetY + object.height + object.lineWidth >= canvas.height) {
    object.y = canvas.height - object.height - object.lineWidth;
    activeBox = createBlock();
  } else {
    object.y += offsetY;
  }
}

function moveLeft(object: Box, offsetLeft: number) {
  if (object.x - offsetLeft <= 0) {
    object.x = 0;
  } else {
    object.x -= offsetLeft;
  }
}

function moveRight(object: Box, offsetRight: number) {
  if (object.x + offsetRight + object.width + object.lineWidth >= canvas.width) {
    object.x = canvas.width - object.width - object.lineWidth;
  } else {
    object.x += offsetRight;
  }
}

function createBlock(): Box {
  const box: Box = createBox(canvas, {
    width: BLOCK_WIDTH,
    height: BLOCK_WIDTH,
  });
  boxes.add(box);
  return box;
}

export function run() {
  drawFrame();
}
