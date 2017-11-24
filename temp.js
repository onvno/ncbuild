const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const readline = require('readline');
const os = require('os');

const func = require('./utils/func');

/**
 * 命令行参数
 * project - 对应 module
 * menu - 对应 comp
 */

module.exports = function(argv){

  /**
   * 基本参数配置
   */
  const REPLACE = {
    name: /{NAME}/g,
    type: /{TYPE}/g,
    node: /{NODE}/g,
    module:/{PROJECT}/g,
    comp:/{MENU}/g,
    data:/{DATA}/g,
    tabName:/{TABNAME}/g,
    upperData:/{UPPERDATA}/g,
  }

  var lowerOutName,
      upperOutType,
      upperOutNode,
      lowerOutModule,
      lowerOutComp,
      lowerOutData,
      lowerOutTabName,
      upperOutData;

  if(argv.file){
    var mergePath = path.isAbsolute(argv.file) ? argv.file : path.join(process.cwd(), argv.file);
    var configStr = fs.readFileSync(mergePath);
    var resultJSON = JSON.parse(configStr);
    lowerOutName = resultJSON.name;
    upperOutType = resultJSON.type;
    upperOutNode = resultJSON.node;
    lowerOutModule = resultJSON.module;
    lowerOutComp = resultJSON.comp;
    lowerOutData = resultJSON.data;
    lowerOutTabName = resultJSON.tabName;

  } else {
    const commandAry = ["out","type","node","module","data","comp","tabName"];
    commandAry.map(function(item){
      if(!argv[item]) throw item + '参数没有输入'; 
    })
    lowerOutName = argv.out.toLowerCase();
    upperOutType = argv.type.toUpperCase();
    upperOutNode = argv.node.toUpperCase();
    lowerOutModule = argv.module.toLowerCase();
    lowerOutComp = argv.comp.toLowerCase();
    lowerOutData = argv.data.toLowerCase();
    lowerOutTabName = argv.TabName;
  }

  upperOutData = func.UpperFirstLetter(lowerOutData);

  const OUT = {
    name: lowerOutName,
    type: upperOutType,
    node: upperOutNode,
    module: lowerOutModule,
    comp: lowerOutComp,
    data: lowerOutData,
    tabName:lowerOutTabName,
    upperData: upperOutData
  }

  /**
   * 执行代码部分
   */
  const rootPath = path.join(__dirname, 'templates')
  const baseDir = path.join(rootPath, '{NAME}');
  const destDir = path.join(process.cwd(),OUT.name);
  const pattern = path.join(baseDir, '**/*');
  const enters = glob.sync(pattern);

  enters.forEach(function(item, index){
    const DIR = rootPath.replace(/\\/g,'/');
    const PRO = process.cwd().replace(/\\/g,'/');
    const dest = item.replace(REPLACE.name, OUT.name).replace(DIR, PRO);
    const isDir = fs.statSync(item).isDirectory();

    if(isDir) {
      fse.ensureDirSync(dest);
    } else {
      var fRead = fs.createReadStream(item);
      var fWrite = fs.createWriteStream(dest);

      var rl = readline.createInterface({
        input: fRead,
        terminal: true
      });
      
      rl.on('line', (line) => {
        var newLine = line
          .replace(REPLACE.name, OUT.name)
          .replace(REPLACE.type, OUT.type)
          .replace(REPLACE.node, OUT.node)
          .replace(REPLACE.module, OUT.module)
          .replace(REPLACE.comp, OUT.comp)
          .replace(REPLACE.data, OUT.data)
          .replace(REPLACE.tabName, OUT.tabName)
          .replace(REPLACE.upperData, OUT.upperData)
          + os.EOL;
        fWrite.write(newLine);
      });

      rl.on('close', () => {
        // console.log(path.basename(dest),'模板文件已经创建到:',dest);
      })
    }
  })

  setTimeout(function(){
    console.log(OUT.name,'模板文件已经创建到', destDir);
  })

}

