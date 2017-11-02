const DEFAULT_SPRING = 0.03;
const FRICTION  = 0.9; // 摩擦系数
const GRAVITY = 2;
/**
 * @desc 弹跳
 */
export default function springTo(object: any, targetX: any, targetY: any, spring?: number) {
  object.vx += (targetX - object.x) * (spring || DEFAULT_SPRING);
  object.vy += (targetY - object.y) * (spring || DEFAULT_SPRING);
  // 加速度与距离成正比 - 所以需要使用“+=”
  object.vy += GRAVITY;
  object.vx *= FRICTION ;
  object.vy *= FRICTION ;
  object.movePosition(object.vx, object.vy);
}

export function spring(source: any, target: any) {
  // TODO
}
