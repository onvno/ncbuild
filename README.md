# ncbuild
nc builder

本项目为内部使用，实现快速创建模板，列表按钮，卡片按钮。



#### 依赖环境

* node 6.0及以上
* npm



#### 安装

```
$ npm install -g ncbuild
```



#### 基本命令

```
$ ncbuild temp [option]  创建基础模板文件夹
$ ncbuild card [option]  创建卡片按钮模板
$ ncbuild list [option]  创建列表按钮模板
```



#### 使用第一步

进入项目目录

```
$ cd project
```



#### 创建模板

```
$ ncbuild temp --module=ModuleName --comp=CompName --name DirectoryName --data MetaData --type TypeName --node NodeName
```

因模板参数较多，为简化，推荐使用以下方式：将参数写入json文件，仅仅传`file`参数即可创建模板.

```
$ ncbuild temp --file ./config.json
```

以`pmreport`为例：

```
$ touch config.json
$ vi config.json

# config.json写入以下内容
{
  "name": "pmreport",
  "data": "pmreport",
  "module": "party",
  "comp": "dwmgr",
  "type": "PT42",
  "node": "PTH10402"
}

#创建模板
$ ncbuild temp --file ./config.json
```

P.S:以上路径可以为相对或绝对路径



#### 创建列表按钮

支持创建`body`,`list`按钮

```
$ ncbuild list --name ComponentName --body[list] ButtonName
```

以党群关系`relation`为例：

```
# 党群关系：列表页面创建名为leave的body按钮
$ ncbuild list --name relation --body leave
# 输出：relationListBodyLeaveAction.js

# 党群关系：列表页创建名为commit的头部按钮
$ ncbuild list --name relation --head commit
# 输出: relationListHeadCommitAction.js
```



#### 创建卡片按钮

支持创建`body`,`list`按钮

```
$ ncbuild card --name ComponentName --body[list] ButtonName
```

以党群关系`relation`为例：

```
# 党群关系：卡片页面创建名为publish的body按钮
$ ncbuild card --name relation --body publish
# 输出：relationCardBodyPublishAction.js

# 党群关系：列表页创建名为edit的头部按钮
$ ncbuild card --name relation --head edit
# 输出: relationCardHeadEditAction.js
```



#### 模板说明

* 创建模板中，部分需要重写的部分已经做了提示



#### TODO

* `file`形式创建模板暂不支持大小写，需要优化❌
* 支持指定路径输出❌
* 输出提示✅
* 支持模板，卡片，列表多命令✅




#### 备注

* 使用了`jc/lsqkmgr`下的`lsqkreport`模板:

  * 修正`fullclassname`统一为此类写法`nc.vo.jc.lsqk.AggLsqk`

  * 去除了私有方法

  * 模板包含子表，创建生成后，需要根据实际情况自行注释

  * 所有参数均按照变量替换

  * html中的`jcform`类名保留不做批量更改

    ​