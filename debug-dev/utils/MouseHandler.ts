import debug from 'debug';

const logger = debug('threejs:mouseHandler');

function addMouseHandler(object: THREE.Object3D, _container?: HTMLElement) {
  const container = _container || document.getElementsByTagName('container')[0] as HTMLElement;
  container.addEventListener(
    'mousemove',
    e => {
      onMouseMove(e);
    },
    false,
  );
  container.addEventListener(
    'mousedown',
    e => {
      onMouseDown(e);
    },
    false,
  );
  container.addEventListener(
    'mouseup',
    e => {
      onMouseUp(e);
    },
    false,
  );

  let pageX = 0;
  let pageY = 0;
  let mouseDown = false;

  function onMouseMove(e: MouseEvent) {
    if (!mouseDown) {
      return;
    }
    e.preventDefault();
    rotateObject(object, pageX - e.pageX, pageY - e.pageY);

    pageX = e.pageX;
    pageY = e.pageY;
  }
  function onMouseDown(e: MouseEvent) {
    e.preventDefault();
    mouseDown = true;
    container.style.cursor = 'move';
    pageX = e.pageX;
    pageY = e.pageY;
  }
  function onMouseUp(e: MouseEvent) {
    e.preventDefault();
    container.style.cursor = 'auto';
    mouseDown = false;
  }
}

/**
 * @param {number} deltaX
 * @param {number} deltaY
 * @desc To Control the Position of Scene in the case of movingMouse
 */
function rotateObject(object: THREE.Object3D, deltaX: number, deltaY: number) {
  const rotationX = deltaX / 100;
  const rotationY = deltaY / 100;

  // 绕y轴旋转
  object.rotation.y += rotationX;
  object.rotation.x += rotationY;

  /**
   * For Test
   */
  // let showDiv = document.getElementById('show-rotation');
  // if (!showDiv) {
  //   showDiv = document.createElement('div');
  //   document.body.appendChild(showDiv);
  //   showDiv.id = 'show-rotation';
  // }
  // showDiv.innerHTML = `Rotation: (${rotationX}, ${rotationY}, 0)`;
}

export {
  addMouseHandler,
};

/**
 * === add MouseHandler START ===
 * @todo
 */

// function onMouseDown(event) {
//   event.preventDefault();

//   canvas.addEventListener('mousemove', onMouseMove, false);
//   canvas.addEventListener('mouseup', onMouseUp, false);
//   canvas.addEventListener('mouseout', onMouseOut, false);

//   mouseOnDown.x = -event.clientX;
//   mouseOnDown.y = event.clientY;

//   targetOnDown.x = target.x;
//   targetOnDown.y = target.y;

//   canvas.style.cursor = 'move';
// }

// function onMouseMove(event) {
  // logger('mouseMove');
  // mouse.x = -event.clientX;
  // mouse.y = event.clientY;

  // var zoomDamp = distance / 1000;

  // target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
  // target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

  // target.y = target.y > PI_HALF ? PI_HALF : target.y;
  // target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
// }

// function onMouseUp(event) {
//   logger('onMouseUp');
//   canvas.removeEventListener('mousemove', onMouseMove, false);
//   canvas.removeEventListener('mouseup', onMouseUp, false);
//   canvas.removeEventListener('mouseout', onMouseOut, false);
//   canvas.style.cursor = 'auto';
// }

// function onMouseOut(event) {
//   logger('onMouseOut');
//   canvas.removeEventListener('mousemove', onMouseMove, false);
//   canvas.removeEventListener('mouseup', onMouseUp, false);
//   canvas.removeEventListener('mouseout', onMouseOut, false);
// }

// function onMouseWheel(event) {
//   logger('onMouseWheel');
//   event.preventDefault();
//  if (overRenderer) {
//     zoom(event.wheelDeltaY * 0.3);
//  }
//   return false;
// }
/**
 * === add MouseHandler END ===
 */
