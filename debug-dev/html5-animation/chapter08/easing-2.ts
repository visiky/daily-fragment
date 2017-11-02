import createCavans from '../base/createCanvas';
import Ball from '../classes/ball';
import utils from '../includes/utils';
import easingMove from '../base/actions/easing';

export function run() {
  const canvas = createCavans();
  const context: CanvasRenderingContext2D = canvas.getContext('2d');
  const ball = new Ball({
    x: 0,
    y: 0,
  });

  const easing = 0.5; // 缓动系数 - 针对ms级别做适应

  // 设置目标点
  const targetX = canvas.width / 2;
  const targetY = canvas.height / 2;
  context.fillText('目标', targetX, targetY);

  // 添加鼠标事件
  let isMouseDown = false;
  const mouse = utils.captureMouse(canvas);
  canvas.addEventListener('mousedown', () => {
    if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
      isMouseDown = true;
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mousemove', onMouseMove, false);
    }
  }, false);

  function onMouseUp() {
    isMouseDown = false;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }

  function onMouseMove() {
    ball.x = mouse.x;
    ball.y = mouse.y;
  }

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 缓动: 速度与距离成正比
    if (!isMouseDown) {
      easingMove(ball, targetX, targetY, easing);
    }
    ball.draw(context);
  }

  drawFrame();
}
