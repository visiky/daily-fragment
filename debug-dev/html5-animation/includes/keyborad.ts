/**
 * @desc 键盘事件监听函数
 */
export default function　addKeyboradHandle(element: HTMLElement, cb: (eventType: string) => any) {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
   switch (e.code) {
    case 'ArrowUp':
      cb('onArrowUp');
      break;
    case 'ArrowDown':
      cb('onArrowDown');
      break;
    case 'ArrowLeft':
      cb('onArrowLeft');
      break;
    case 'ArrowRight':
      cb('onArrowRight');
      break;
   }
  }, false);
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      cb('offArrowUp');
      break;
    case 'ArrowDown':
      cb('offArrowDown');
      break;
    case 'ArrowLeft':
      cb('offArrowLeft');
      break;
    case 'ArrowRight':
      cb('offArrowRight');
      break;
    }
   }, false);
}
