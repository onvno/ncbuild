const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const readline = require('readline');
const os = require('os');

const func = require('./utils/func');

/**
 * 标准文件名,小驼峰写法
 * relationCardBodyDeleteAction.js
 * {NAME}CardBody{TYPE}Action.js
 */


module.exports = function(argv){

  /**
   * 模板内容替换准备
   */
  const REPLACE = {
    type: /{TYPE}/g,
    upperType:/{UPPERTYPE}/g,
    name:/{NAME}/g,
  }

  var baseTemplate;
  var lowerType,
      upperType,
      lowerName;
  var typeAry = ['head', 'body', 'inner'];

  typeAry.map(function(item){
    if(argv[item]){
      baseTemplate = func.UpperFirstLetter(item);
      lowerType = argv[item];
      return
    }
  })
  
  lowerName = argv.name.toLowerCase();
  lowerType = lowerType.toLowerCase();
  upperType = func.UpperFirstLetter(lowerType);
  
  const OUT = {
    name: lowerName,
    type: lowerType,
    upperType: upperType,
  }

  console.log(OUT);

  /**
   * 模板替换
   */

  const baseFilePath = path.join(__dirname, 'templates', 'CARD', `{NAME}Card${baseTemplate}{TYPE}Action.js`);
  const destFilePath = path.join(process.cwd(),`${OUT.name}Card${baseTemplate}${OUT.upperType}Action.js`);

  var fRead = fs.createReadStream(baseFilePath);
  var fWrite = fs.createWriteStream(destFilePath);

  var rl = readline.createInterface({
    input: fRead,
    terminal: true
  });
  
  rl.on('line', (line) => {
    var newLine = line
      .replace(REPLACE.type, OUT.type)
      .replace(REPLACE.upperType, OUT.upperType)
      + os.EOL;
    fWrite.write(newLine);
  });

  rl.on('close', () => {
    console.log(path.basename(destFilePath),'替换&拷贝完毕');
  })


}