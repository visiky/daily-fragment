/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
if (!(window as any).requestAnimationFrame) {
  (window as any).requestAnimationFrame =
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    (callback => {
      return (window as any).setTimeout(callback, 17 /*~ 1000/60*/);
    });
}

/**
 * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame'
 * to reflect an update to the W3C Animation-Timing Spec.
 *
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!(window as any).cancelAnimationFrame) {
  (window as any).cancelAnimationFrame =
    (window as any).cancelRequestAnimationFrame ||
    (window as any).webkitCancelAnimationFrame ||
    (window as any).webkitCancelRequestAnimationFrame ||
    (window as any).mozCancelAnimationFrame ||
    (window as any).mozCancelRequestAnimationFrame ||
    (window as any).msCancelAnimationFrame ||
    (window as any).msCancelRequestAnimationFrame ||
    (window as any).oCancelAnimationFrame ||
    (window as any).oCancelRequestAnimationFrame ||
    (window as any).clearTimeout;
}

/* Object that contains our utility functions.
 * Attached to the window object which acts as the global namespace.
 */
const utils: {
  [type: string]: any;
} = {};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
utils.captureMouse = element => {
  // tslint:disable-next-line:one-variable-per-declaration
  const mouse = { x: 0, y: 0, event: null },
    // tslint:disable-next-line:variable-name
    body_scrollLeft = document.body.scrollLeft,
    // tslint:disable-next-line:variable-name
    element_scrollLeft = document.documentElement.scrollLeft,
    // tslint:disable-next-line:variable-name
    body_scrollTop = document.body.scrollTop,
    // tslint:disable-next-line:variable-name
    element_scrollTop = document.documentElement.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener(
    'mousemove',
    event => {
      let x;
      let y;

      if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + body_scrollLeft + element_scrollLeft;
        y = event.clientY + body_scrollTop + element_scrollTop;
      }
      x -= offsetLeft;
      y -= offsetTop;

      mouse.x = x;
      mouse.y = y;
      mouse.event = event;
    },
    false,
  );

  return mouse;
};

/**
 * Keeps track of the current (first) touch position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, isPressed, event
 */
utils.captureTouch = element => {
  const touch = {
    x: null,
    y: null,
    isPressed: false,
    event: null,
  };
  // tslint:disable-next-line:variable-name
  const body_scrollLeft = document.body.scrollLeft;
  // tslint:disable-next-line:variable-name
  const element_scrollLeft = document.documentElement.scrollLeft;
  // tslint:disable-next-line:variable-name
  const body_scrollTop = document.body.scrollTop;
  // tslint:disable-next-line:variable-name
  const element_scrollTop = document.documentElement.scrollTop;
  const offsetLeft = element.offsetLeft;
  const offsetTop = element.offsetTop;

  element.addEventListener(
    'touchstart',
    event => {
      touch.isPressed = true;
      touch.event = event;
    },
    false,
  );

  element.addEventListener(
    'touchend',
    event => {
      touch.isPressed = false;
      touch.x = null;
      touch.y = null;
      touch.event = event;
    },
    false,
  );

  element.addEventListener(
    'touchmove',
    event => {
      let x;
      let y;
      // tslint:disable-next-line:variable-name
      const touch_event = event.touches[0]; // first touch

      if (touch_event.pageX || touch_event.pageY) {
        x = touch_event.pageX;
        y = touch_event.pageY;
      } else {
        x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
        y = touch_event.clientY + body_scrollTop + element_scrollTop;
      }
      x -= offsetLeft;
      y -= offsetTop;

      touch.x = x;
      touch.y = y;
      touch.event = event;
    },
    false,
  );

  return touch;
};

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
utils.parseColor = (color, toNumber) => {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return color || 0; // chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return (window as any).parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color || 0).toString(16)).substr(-6); // pad
    }
    return color;
  }
};

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
utils.colorToRGB = (color, alpha) => {
  // number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = (window as any).parseInt(color.slice(1), 16);
  }
  alpha = alpha === undefined ? 1 : alpha;
  // parse hex values
  // tslint:disable-next-line:no-bitwise
  const r = (color >> 16) && 0xff;
  // tslint:disable-next-line:no-bitwise
  const g = (color >> 8) && 0xff;
  const b = color && 0xff;
  const a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
  // only use 'rgba' if needed
  if (a === 1) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
utils.containsPoint = (rect, x, y) => {
  return !(
    x < rect.x ||
    x > rect.x + rect.width ||
    y < rect.y ||
    y > rect.y + rect.height
  );
};

/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
utils.intersects = (rectA, rectB) => {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  );
};

export default utils;
