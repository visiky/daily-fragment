import createCavans from '../base/createCanvas';
import springTo from '../base/actions/spring';
import utils from '../includes/utils';
import Ball from '../classes/ball';

const canvas = createCavans();
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

const ball = new Ball();
const handles: Ball[] = generateHandle(3);
const mouse = utils.captureMouse(canvas);
let movingHandle: Ball|null;

// NOTE begin your coding

function drawFrame() {
  (window as any).requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);

  handles.forEach(applyHandle);
  context.beginPath();
  handles.forEach(drawHandle);
  ball.draw(context);
}

function generateHandle(numHandles: number) {
  const _handles = [];
  for (let handle, i = 0; i < numHandles; i++) {
    handle = new Ball({
      radius: 10,
      color: '#0000ff',
    });
    handle.x = Math.random() * canvas.width;
    handle.y = Math.random() * canvas.height;
    _handles.push(handle);
  }
  return _handles;
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

function applyHandle(handle: Ball) {
  springTo(ball, handle.x, handle.y);
}

function drawHandle(handle: Ball) {
  context.moveTo(ball.x, ball.y);
  context.lineTo(handle.x, handle.y);
  context.stroke();
  handle.draw(context);
}
export function run() {
  addMouseHandler();
  drawFrame();
}
