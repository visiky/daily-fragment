import Ball from '../classes/ball';
import createCavans from '../base/createCanvas';

export function run() {
  const canvas = createCavans();
  const context = canvas.getContext('2d');
  const ball = new Ball();
  let angleX = 0;
  let angleY = 0;
  const range = 50;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const xspeed = 0.07;
  const yspeed = 0.11;
  drawFrame();

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    const x = centerX + Math.sin(angleX) * range;
    const y = centerY + Math.sin(angleY) * range;
    ball.setPosition(x, y);
    angleX += xspeed;
    angleY += yspeed;
    ball.draw(context);
  }
}
