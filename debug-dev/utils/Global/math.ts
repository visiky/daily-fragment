/**
 * @desc 经纬度转空间坐标的具体代码, r 为球体半径
 * @see https://www.atatech.org/articles/94449
 */
export function lnglatToXYZ({lng, lat}, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = -1 * lng * Math.PI / 180;
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}
