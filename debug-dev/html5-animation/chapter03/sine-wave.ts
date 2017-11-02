import Ball from '../classes/ball';
import createCavans from '../base/createCanvas';
import { transformToAngle } from '../base/utils';

export function run() {
  const canvas = createCavans() as HTMLCanvasElement;
  canvas.width = 1000;
  canvas.height = 600;
  const context: CanvasRenderingContext2D = canvas.getContext('2d');
  const ball = new Ball();

  // initial ball here
  let ballX = 0;
  let ballY = canvas.height / 2;
  ball.setPosition(ballX, ballY);

  let radians = 0;
  const speed = 0.5;
  const range = 2;
  function drawFrame() {
    (window as any).requestAnimationFrame(drawFrame, canvas);

    const bounds = ball.getBounds();
    const lineWidth = ball.getLineWidth();
    context.rect(bounds.x, bounds.y, bounds.width, bounds.height);
    context.stroke();
    // 经过测试，需要考虑 strokeWidth
    context.clearRect(bounds.x - lineWidth, bounds.y - lineWidth,
        bounds.width + 2 * lineWidth, bounds.height + 2 * lineWidth);

    // coding animation here
    const angle = transformToAngle(radians);
    ballX += Math.abs(Math.sin(angle)) * range;
    if (ballX > canvas.width) {
      ballX = 0;
    }
    ballY += Math.cos(angle) * range;
    radians += speed;
    ball.setPosition(ballX, ballY);
    addTrace(ballX, ballY);
    ball.draw(context);
  }

  const smallBall = new Ball({
    radius: 2,
    color: 'grey',
    strokeStyle: '#333',
  });
  function addTrace(x: number, y: number) {
    const _bounds = smallBall.getBounds();
    const lineWidth = smallBall.getLineWidth();

    // FIXME 调整时间 requestAnimationFrame 大致时间为16ms
    setInterval(() => {
      context.clearRect(_bounds.x - lineWidth, _bounds.y - lineWidth,
        _bounds.width + 2 * lineWidth, _bounds.height + 2 * lineWidth);
    }, 2000);
    smallBall.setPosition(x - 2 * ball.getRadius(), y);
    smallBall.draw(context);
  }

  // 启动绘画
  drawFrame();
}
