#!/usr/bin/env node --harmony

const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const readline = require('readline');
const os = require('os');

// __dirname - 原始路径
// process.cwd() - 运行路径



const argv = require('yargs')
.demand(['out','type','node'])
.option('out', {
  alias: 'O',
  describe: '当前目录输出模板名称',
})
.option('type', {
  alias: 'T',
  describe: '模板单据类型billtype名称',
})
.option('node', {
  alias: 'N',
  describe: '模板节点funcnode名称',
}).help().argv;

const REPLACE = {
  name: /caugment/g,
  upperName: /Caugment/g,
  type: /PT26/g,
  node: /PTH10206/g,
}

const lowerOutName = argv.out.toLowerCase();
const upperOutName = UpperFirstLetter(lowerOutName);
const upperOutType = argv.type.toUpperCase();
const upperOutNode = argv.node.toUpperCase();
function UpperFirstLetter(str) {
  const lowerAry = str.split("");
  lowerAry[0] = String.fromCharCode(lowerAry[0].charCodeAt() - 32);
  return lowerAry.join("");
}

const OUT = {
  name: lowerOutName,
  upperName: upperOutName,
  type: upperOutType,
  node: upperOutNode,
}

const baseDir = path.join(__dirname, 'caugment');
const destDir = path.join(process.cwd(),argv.out);

const pattern = path.join(baseDir, '**/*');
const enters = glob.sync(pattern);

enters.forEach(function(item, index){
  const dest = item.replace(REPLACE.name, argv.out).replace(__dirname, process.cwd());
  
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
        .replace(REPLACE.upperName, OUT.upperName)
        + os.EOL;
      fWrite.write(newLine);
    });

    rl.on('close', () => {
      // console.log(item,'...close')
    })
  }
})


