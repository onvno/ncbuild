const base = require('./base');

/**
 * 标准文件名,小驼峰写法
 * relationListBodyDeleteAction.js
 * {NAME}ListBody{TYPE}Action.js
 */

module.exports = function(argv){
  
  const location = 'list';
  base(argv, location);
  
}