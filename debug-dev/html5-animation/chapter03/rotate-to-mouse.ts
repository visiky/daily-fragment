import Arrow from '../classes/arrow';
import createCavans from '../base/createCanvas';
import utils from '../includes/utils';

export function run() {
  const canvas = createCavans();
  const context = canvas.getContext('2d');
  const mouse = utils.captureMouse(canvas);
  const arrow = new Arrow();

  arrow.x = canvas.width / 2;
  arrow.y = canvas.height / 2;

  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    const dx = mouse.x - arrow.x;
    const dy = mouse.y - arrow.y;
    arrow.rotation = Math.atan2(dy, dx); // radians
    arrow.draw(context);
  }

  drawFrame();
}
