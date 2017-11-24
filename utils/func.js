var func = {};

/**
 * 字符串首字母大写
 */
func.UpperFirstLetter = function(str) {
  const lowerAry = str.split("");
  lowerAry[0] = String.fromCharCode(lowerAry[0].charCodeAt() - 32);
  return lowerAry.join("");
}

module.exports = func;