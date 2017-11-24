#!/usr/bin/env node --harmony

const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const readline = require('readline');
const os = require('os');

const tempJS = require('./temp.js');
const cardJS = require('./card.js');
const listJS = require('./list.js');

// __dirname - 原始路径
// process.cwd() - 运行路径

const argv = require('yargs')
// .demand(['out','type','node','module','comp', 'data',"tabName"])
.command('temp', '创建基础模板文件夹', function(yargs){
  return yargs
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
          .option('tabName', {
            alias: 'T',
            describe: '子表tabname',
          })
          .option('file', {
            alias: 'F',
            describe: '配置文件',
          })
})
.command('card', '创建卡片按钮模板', function(yargs){
  return yargs
          .option('head', {
            describe: '创建卡片head按钮'
          })
          .option('body',{
            describe: '创建卡片body按钮'
          })
          .option('inner',{
            describe: '创建卡片inner按钮'
          });
})
.command('list', '创建列表按钮模板', function(yargs){
  return yargs
          .option('head', {
            describe: '创建卡片head按钮'
          })
          .option('body',{
            describe: '创建卡片body按钮'
          });
})
.help().argv;


const argvCmdAry = argv._;
const cmdAry = [
  'temp',
  'card',
  'list'
]

if(argvCmdAry.includes(cmdAry[0])){
  tempJS(argv); 
} else if (argvCmdAry.includes(cmdAry[1])) {
  cardJS(argv);
} else if (argvCmdAry.includes(cmdAry[2])) {
  listJS(argv);
}





