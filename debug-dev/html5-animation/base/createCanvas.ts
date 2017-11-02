export const DEFAULT_CANVAS_WIDTH = 600;
export const DEFAULT_CANVAS_HEIGHT = 600;

function createCavans(): HTMLCanvasElement {
  let canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.id = 'canvas';
    canvas.width = DEFAULT_CANVAS_WIDTH;
    canvas.height = DEFAULT_CANVAS_HEIGHT;
  }
  return canvas;
}

export default createCavans;
