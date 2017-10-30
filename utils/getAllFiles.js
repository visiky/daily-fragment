const rd = require("rd");
const path = require("path");

/**
 * 
 * @param {string} dir - 查找路径
 * @param {function} cb - 回调函数，返回获取到的ts文件集
 */
function getFiles(dir, pattern) {
  // 同步列出目录下的所有文件
  let allFiles = rd.readSync(dir);
  allFiles = allFiles.filter(file => {
    return pattern.test(file);
  });
  allFiles = allFiles.map(file => {
    return path.basename(file).slice(0, -3);
  })
  return allFiles;
}

module.exports = getFiles;
