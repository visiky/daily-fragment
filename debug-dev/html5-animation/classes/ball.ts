import utils from '../includes/utils';

export default class Ball {

  public x = 0;
  public y = 0;
  // 速度
  public vx = 0;
  public vy = 0;
  public rotation = 0;
  public scaleX = 1;
  public scaleY = 1;
  public radius;
  public lineWidth = 1;
  public color;
  public strokeStyle;

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
    this.x = x || this.x;
    this.y = y || this.y;
  }

  public movePosition = (dx?: number, dy?: number) => {
    this.x += (dx || 0);
    this.y += (dy || 0);
  }

  public setScale = (scaleX?: number, scaleY?: number) => {
    this.scaleX = scaleX || this.scaleX;
    this.scaleY = scaleY || this.scaleY;
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
