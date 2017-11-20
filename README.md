# ncbuild
nc builder

快速节点模板创建，本项目为项目内部使用。



#### 安装

```
$ npm install -g ncbuild
```



#### 使用

```
# 进入项目目录
$ cd project

# 项目目录创建模板
$ ncbuild --project=ProjectName --menu=MenuName --out Name --type TypeName --node NodeName
或
$ ncbuild -P ProjectName -M MenuName -O Name -T TypeName -N NodeName

# 以training节点为例，单据类型PT32,菜单编码PTH10302
$ ncbuild --project=JC --menu=lsqkmgr --out=lsqkreport --type=JC31 --node=JCH00301 --data=lsqk

```

支持参数为小写，如`PT32`,输入为`pt32`

通过以上操作，在`project`目录快速创建`training`节点模板。



#### 备注

* 使用了jc下的lsqkreport模板
  * 修正`fullclassname`统一为此类写法`nc.vo.jc.lsqk.AggLsqk`
  * 所有参数均按照变量替换
  * html中的`jcform`类名保留不做批量更改