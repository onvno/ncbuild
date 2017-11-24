const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const readline = require('readline');
const os = require('os');

const func = require('./utils/func');


module.exports = function(argv, location){


    /**
     * location处理: list & card
     * list示例：
     * location: list locationUpper: LIST locationUpperFirst: List
     */
    var location = location.toLowerCase();
    var locationUpper = location.toUpperCase();
    var locationUpperFirst = func.UpperFirstLetter(location);


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
    var typeAry = ['head', 'body'];
  
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
  
    // console.log(OUT);
  

    /**
     * 模板替换
     */
    const baseFilePath = path.join(__dirname, 'templates',
      `${locationUpper}`, `{NAME}${locationUpperFirst}${baseTemplate}{TYPE}Action.js`);
    const destFilePath = path.join(process.cwd(),`${OUT.name}${locationUpperFirst}${baseTemplate}${OUT.upperType}Action.js`);
  
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
      console.log(path.basename(destFilePath),'模板文件已经创建到:',destFilePath);
    })





}