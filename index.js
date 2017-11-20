#!/usr/bin/env node --harmony

const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const readline = require('readline');
const os = require('os');

// __dirname - 原始路径
// process.cwd() - 运行路径


/**
 * 命令行参数
 * project - 对应 module
 * menu - 对应 comp
 */


const argv = require('yargs')
// .demand(['out','type','node','module','comp', 'data'])
.option('out', {
  alias: 'O',
  describe: '当前目录输出模板名称:lsqkreport',
})
.option('type', {
  alias: 'T',
  describe: '模板单据类型billtype名称:JC31',
})
.option('node', {
  alias: 'N',
  describe: '模板节点funcnode名称:JCH00301',
})
.option('module', {
  alias: 'M',
  describe: '所属项目名称:JC',
})
.option('comp', {
  alias: 'C',
  describe: '所属项目分类:lsqkmgr',
})
.option('data', {
  alias: 'D',
  describe: '元数据:lsqk',
})
.option('file', {
  alias: 'F',
  describe: '配置文件',
})
.help().argv;


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
  upperData:/{UPPERDATA}/g,
}

var lowerOutName,
    upperOutType,
    upperOutNode,
    lowerOutModule,
    lowerOutComp,
    lowerOutData,
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

} else {
  const commandAry = ["out","type","node","module","data","comp"];
  commandAry.map(function(item){
    if(!argv[item]) throw item + '参数没有输入'; 
  })
  lowerOutName = argv.out.toLowerCase();
  upperOutType = argv.type.toUpperCase();
  upperOutNode = argv.node.toUpperCase();
  lowerOutModule = argv.module.toLowerCase();
  lowerOutComp = argv.comp.toLowerCase();
  lowerOutData = argv.data.toLowerCase();
}

upperOutData = UpperFirstLetter(lowerOutData);

function UpperFirstLetter(str) {
  const lowerAry = str.split("");
  lowerAry[0] = String.fromCharCode(lowerAry[0].charCodeAt() - 32);
  return lowerAry.join("");
}

const OUT = {
  name: lowerOutName,
  type: upperOutType,
  node: upperOutNode,
  module: lowerOutModule,
  comp: lowerOutComp,
  data: lowerOutData,
  upperData: upperOutData
}


/**
 * 执行代码部分
 */
const baseDir = path.join(__dirname, '{NAME}');
const destDir = path.join(process.cwd(),OUT.name);
const pattern = path.join(baseDir, '**/*');
const enters = glob.sync(pattern);

enters.forEach(function(item, index){
  const dest = item.replace(REPLACE.name, OUT.name).replace(__dirname, process.cwd());
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
        .replace(REPLACE.upperData, OUT.upperData)
        + os.EOL;
      fWrite.write(newLine);
    });

    rl.on('close', () => {
      console.log(path.basename(dest),'替换&拷贝完毕');
    })
  }
})



