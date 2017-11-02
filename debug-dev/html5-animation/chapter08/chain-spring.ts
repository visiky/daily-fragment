import createCavans from '../base/createCanvas';
import Ball from '../classes/ball';
import springTo from '../base/actions/spring';
import utils from '../includes/utils';

export function run() {
  const canvas = createCavans();
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const ball0 = new Ball();
  const ball1 = new Ball();
  const ball2 = new Ball();
  const mouse = utils.captureMouse(canvas);

  // NOTE begin your coding

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    springTo(ball0, mouse.x, mouse.y);
    springTo(ball1, ball0.x, ball0.y);
    springTo(ball2, ball1.x, ball1.y);

    // draw spring
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
    context.lineTo(ball0.x, ball0.y);
    context.lineTo(ball1.x, ball1.y);
    context.lineTo(ball2.x, ball2.y);
    context.stroke();

    // draw balls
    ball0.draw(context);
    ball1.draw(context);
    ball2.draw(context);
  }

  drawFrame();
}
