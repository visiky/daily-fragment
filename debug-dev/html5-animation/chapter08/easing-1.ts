import createCavans from '../base/createCanvas';
import Ball from '../classes/ball';

export function run() {
  const canvas = createCavans();
  const context: CanvasRenderingContext2D = canvas.getContext('2d');
  const ball = new Ball({
    x: 0,
    y: 0,
  });

  const easing = 0.5; // 缓动系数

  // 设置目标点
  const targetX = canvas.width;
  const targetY = canvas.height;

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    const dx = targetX - ball.getPosition().x;
    const dy = targetY - ball.getPosition().y;

    const vx = dx * easing;
    const vy = dy * easing;
    ball.movePosition(vx, vy); // <=> ball.x += vx; ball.y += vy;
    ball.draw(context);
  }

  drawFrame();
}
