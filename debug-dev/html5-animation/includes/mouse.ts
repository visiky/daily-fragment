/**
 * @desc 获取事件相对于document的绝对坐标
 * @param event
 */
function getEventAbsCoord(event) {
  const body_scrollLeft = document.body.scrollLeft;
  const element_scrollLeft = document.documentElement.scrollLeft;
  const body_scrollTop = document.body.scrollTop;
  const element_scrollTop = document.documentElement.scrollTop;
  let x;
  let y;
  if (event.pageX || event.pageY) {
    x = event.pageX;
    y = event.pageY;
  } else {
    x = event.clientX + body_scrollLeft + element_scrollLeft;
    y = event.clientY + body_scrollTop + element_scrollTop;
  }
  return {
    x,
    y,
  };
}
/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
const captureMouse = element => {
  // tslint:disable-next-line:one-variable-per-declaration
  const mouse = { x: 0, y: 0, event: null },
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener(
    'mousemove',
    event => {

      let { x, y } = getEventAbsCoord(event);
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

export {
  getEventAbsCoord,
  captureMouse,
};
