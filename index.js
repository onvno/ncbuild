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
.option('out', {
  alias: 'O',
  describe: '当前目录输出',
}).help().argv;

const baseDir = path.join(__dirname, 'caugment');
const destDir = path.join(process.cwd(),argv.out);

const pattern = path.join(baseDir, '**/*');
const enters = glob.sync(pattern);



enters.forEach(function(item, index){
  const dest = item.replace(/caugment/g, argv.out).replace(__dirname, process.cwd());
  
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
      var newLine = line.replace(/caugment/g, argv.out) + os.EOL;
      fWrite.write(newLine);
    });

    rl.on('close', () => {
      // console.log(item,'...close')
    })
  }
})


