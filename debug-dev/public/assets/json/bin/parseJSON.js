const fs = require('fs');

const argvs = process.argv;
const sourceFile = argvs[2];

function lnglatToXYZ(lng, lat) {
  if (argvs[3] === '-t' && !isNaN(argvs[4])) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = -1 * lng * Math.PI / 180;
    const radius = argvs[4];
    return {
      x:(radius * Math.sin(phi) * Math.cos(theta)).toFixed(2),
      y: (radius * Math.cos(phi)).toFixed(2),
      z: (radius * Math.sin(phi) * Math.sin(theta)).toFixed(2),
    };
  }
  return null;
}

/**
 * @desc 将地图json数据转换为自己需要的数据格式
 * @usage1 node parseJSON ../xxx.json
 * @usage2 node parseJSON ../xxx.json -t [radius] 带经纬度转换
 */
if (sourceFile && sourceFile.endsWith('json')) {
  fs.readFile(sourceFile, (err, data) => {
    const features = JSON.parse(data.toString()).features || [];

    let result = features.map(feature => {
      const properties = feature.properties;
      const { name, latitude, longitude } = properties;
      const position = lnglatToXYZ(longitude, latitude);
      return Object.assign({
        name,
        coord: [latitude, longitude],
      }, position && { position });
    });
    result = result.filter(item => {
      return item.name;
    });
    const writer = fs.createWriteStream(`${sourceFile.slice(0, -4)}js`);
    writer.write(JSON.stringify(result));
  });
}
