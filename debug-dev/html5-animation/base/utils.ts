import { IPoint } from '../../interface';

export function transformToAngle(radians: number) {
  return Math.PI / 180 * radians;
}

export function transformToRadians(angle: number) {
  return 180 / Math.PI * angle;
}

/**
 * @desc 计算包裹圆形的最小矩形
 * @param {number} radius
 */
export function smallestRect(radius): number {
  return 2 * radius * Math.sin(transformToAngle(45));
}
/**
 * @desc 计算两点间距离
 * @param {IPoint} pointX
 * @param {IPoint} pointY
 */
export function distacnce(pointX: IPoint, pointY: IPoint) {
  const dx = pointX.x - pointY.x;
  const dy = pointX.y - pointY.y;
  return Math.sqrt(dx * dx + dy * dy);
}
