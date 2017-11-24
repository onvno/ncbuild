const base = require('./base');

/**
 * 标准文件名,小驼峰写法
 * relationCardBodyDeleteAction.js
 * {NAME}CardBody{TYPE}Action.js
 */

module.exports = function(argv){
  
  const location = 'card';
  base(argv, location);
  
}