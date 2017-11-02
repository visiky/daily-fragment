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

  const radius = ball.getRadius();
  const easing = 4 * radius / 1000; // 缓动系数 - 针对ms级别做适应

  // 设置目标点

  const mouse = utils.captureMouse(canvas);

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    easingMove(ball, mouse.x, mouse.y, easing);
    ball.draw(context);
  }

  drawFrame();
}
