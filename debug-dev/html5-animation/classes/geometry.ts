export default abstract class Geometry {
  public x = 0;
  public y = 0;

  public vx;
  public vy;
  public rotation;
  public scaleX = 1;
  public scaleY = 1;
  public color;
  public lineWidth = 1;
  public strokeStyle = 'FF0000';
  // For Circle
  public radius;
  // For Rect
  public width;
  public height;

  public abstract draw: Function;
  public abstract getBounds: () => {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  public setPosition = (x?: number, y?: number) => {
    this.x = x || this.x;
    this.y = y || this.y;
  }

  public movePosition = (dx?: number, dy?: number) => {
    this.x += (dx || 0);
    this.y += (dy || 0);
  }

  public getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
