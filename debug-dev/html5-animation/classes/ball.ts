import utils from '../includes/utils';
import Geometry from './geometry';

export default class Ball extends Geometry {

  public radius;
  constructor(options?: {
    [type: string]: any,
  }) {
    super();
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

  public setScale = (scaleX?: number, scaleY?: number) => {
    this.scaleX = scaleX || this.scaleX;
    this.scaleY = scaleY || this.scaleY;
  }

  public getBounds = () => {
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
