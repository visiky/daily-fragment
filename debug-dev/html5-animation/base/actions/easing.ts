import Ball from 'dist/debug-dev/html5-animation/classes/ball';

const DEFAULT_EASING = 0.05;

/**
 * @desc 缓动
 * @todo 如何插件化的注入到ball的行为中
 */
export default function easingMove(ball: Ball, targetX: number, targetY: number, easing?: number) {
  const dx = targetX - ball.x;
  const dy = targetY - ball.y;

  // 缓动: 速度与距离成正比
  const vx = dx * (easing || DEFAULT_EASING);
  const vy = dy * (easing || DEFAULT_EASING);
  ball.movePosition(vx, vy); // <=> ball.x += vx; ball.y += vy;
}
