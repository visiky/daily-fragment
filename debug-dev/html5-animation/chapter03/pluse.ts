import Ball from '../classes/ball';
import createCavans from '../base/createCanvas';

export function run() {
  const canvas = createCavans();
  const context = canvas.getContext('2d');
  const ball = new Ball({
    radius: 40,
  });

  // initial ball here
  ball.setPosition(canvas.width / 2, canvas.height / 2);

  drawFrame();

  let angle = 0;
  const speed = 5;
  const range = 0.5;
  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // coding animation here
    const centerScale = 1;
    const scale = centerScale + Math.sin(Math.PI / 180 * angle) * range;
    ball.setScale(scale, scale);
    angle += speed;
    ball.draw(context);
  }
}
