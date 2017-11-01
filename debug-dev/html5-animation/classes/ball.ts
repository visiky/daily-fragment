import utils from '../includes/utils';
import { smallestRect } from '../base/utils';

export default class Ball {

  private x = 0;
  private y = 0;
  private rotation = 0;
  private scaleX = 1;
  private scaleY = 1;
  private radius;
  private lineWidth = 1;
  private color;
  private strokeStyle;

  constructor(options?: {
    [type: string]: any,
  }) {
    options = options || {};
    this.radius = options.radius || 20;
    this.color = utils.parseColor(options.color || '#FFC107');
    this.strokeStyle = utils.parseColor(options.strokeStyle || '#FF9800');
  }

  public draw = (context: CanvasRenderingContext2D) => {
    context.save();
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.strokeStyle = this.strokeStyle;
    context.beginPath();
    // x, y, radius, start_angle, end_angle, anti-clockwise 逆时针
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  }

  public setPosition = (x?: number, y?: number) => {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
  }

  public movePosition = (dx?: number, dy?: number) => {
    this.x += (dx || 0);
    this.y += (dy || 0);
  }

  public setScale = (scaleX?: number, scaleY?: number) => {
    if (scaleX) {
      this.scaleX = scaleX;
    }
    if (scaleY) {
      this.scaleY = scaleY;
    }
  }

  public getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  public getBounds() {
    // FIXME 考虑scale的影响
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  }

  public getRadius(): number {
    return this.radius;
  }

  public getLineWidth(): number {
    return this.lineWidth;
  }
}
