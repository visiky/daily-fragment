import createCavans from '../base/createCanvas';
import Ball from '../classes/ball';
// import utils from '../includes/utils';

export function run() {
  const canvas = createCavans();
  const context: CanvasRenderingContext2D = canvas.getContext('2d');
  const ball = new Ball({
    x: 0,
    y: 0,
  });

  // NOTE begin your coding

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);

    // NOTE begin your coding
    ball.draw(context);
  }

  drawFrame();
}
