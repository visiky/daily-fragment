import createCavans from '../base/createCanvas';
import Ball from '../classes/ball';
import utils from '../includes/utils';
import springTo from '../base/actions/spring';

// TODO 待修改demo
const canvas = createCavans();
const context: CanvasRenderingContext2D = canvas.getContext('2d');

const mouse = utils.captureMouse(canvas);
const handles: Ball[] = [];
const numHandles = 3;
const springLength = 10;
for (let handle, i = 0; i < numHandles; i++) {
  handle = new Ball({
    radius: 20,
  });
  handle.x = Math.random() * (canvas.width - 40) + 40;
  handle.y = Math.random() * (canvas.height - 40) + 40;
  handles.push(handle);
}

let movingHandle: Ball|null = null;

function applyHandle(handle: Ball, index: number) {
  if (!movingHandle) {
    return;
  } else if (handle !== movingHandle) {
    for (let another: Ball, anotherIdx = 0; anotherIdx < numHandles; anotherIdx++) {
      another = handles[anotherIdx];
      if (index !== anotherIdx) {
        const angle = Math.atan2(another.y - handle.y, another.x - handle.x);
        // FIXME 添加X轴斥力 如何正确调整
        const targetX = another.x - Math.cos(angle) * springLength + (index - anotherIdx) * 100;
        const targetY = another.y - Math.sin(angle) * springLength;
        springTo(handle, targetX, targetY);
      }
    }
  }
}

function drawHandle() {
  context.beginPath();
  context.moveTo(handles[numHandles - 1].x, handles[numHandles - 1].y);
  handles.forEach(handle => {
    context.lineTo(handle.x, handle.y);
  });
  context.stroke();
}

function drawFrame() {
  (window as any).requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);

  handles.forEach(applyHandle);
  drawHandle();
  handles.forEach(handle => handle.draw(context));
}

function addMouseHandler() {
  canvas.addEventListener('mousedown', () => {
    handles.forEach(handle => {
      if (utils.containsPoint(handle.getBounds(), mouse.x, mouse.y)) {
        movingHandle = handle;
      }
    });
  }, false);

  canvas.addEventListener('mouseup', () => {
    if (movingHandle) {
      movingHandle = null;
    }
  }, false);

  canvas.addEventListener('mousemove', () => {
    if (movingHandle) {
      movingHandle.x = mouse.x;
      movingHandle.y = mouse.y;
    }
  }, false);
}

export function run() {
  addMouseHandler();
  drawFrame();
}
