
function addMouseHandler(object: THREE.Object3D) {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.addEventListener(
    'mousemove',
    e => {
      onMouseMove(e);
    },
    false,
  );
  canvas.addEventListener(
    'mousedown',
    e => {
      onMouseDown(e);
    },
    false,
  );
  canvas.addEventListener(
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
    pageX = e.pageX;
    pageY = e.pageY;
  }
  function onMouseUp(e: MouseEvent) {
    e.preventDefault();
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

  let showDiv = document.getElementById('show-rotation');
  if (!showDiv) {
    showDiv = document.createElement('div');
    document.body.appendChild(showDiv);
    showDiv.id = 'show-rotation';
  }
  showDiv.innerHTML = `Rotation: (${rotationX}, ${rotationY}, 0)`;
}

export {
  addMouseHandler,
};
