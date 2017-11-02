import utils from '../includes/utils';
import Geometry from './geometry';

export default class Box extends Geometry {
  public width;
  public height;

  constructor(options?: {
    width?: number;
    height?: number;
    color?: string|number;
    [type: string]: any;
  }) {
    super();
    const { width, height, color, x, y } = options;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 50;
    this.height = height || 50;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = utils.parseColor(color || '#FF000');
    this.lineWidth = 1;
  }
  public draw = (context: CanvasRenderingContext2D) => {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  }
  public getBounds = () => {
    // FIXME 考虑scale的影响
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}

/**
 * @desc 在画布上创建随机大小的Box
 * @param canvas - 画布
 */
export function createBox(canvas: HTMLCanvasElement, boxOptions?: {
  [type: string]: any,
}): Box {
  const box = new Box(boxOptions);
  return box;
}

/**
 * @desc 在画布上创建随机大小的Box
 * @param canvas - 画布
 */
export function createRandomBox(canvas: HTMLCanvasElement): Box {
  const box = new Box({
    width: Math.random() * 40 + 10,
    height: Math.random() * 40 + 10,
    x: Math.random() * canvas.width,
  });
  return box;
}
