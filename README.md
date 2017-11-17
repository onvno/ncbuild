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
$ ncbuild --out Name --type TypeName --node NodeName
或
$ ncbuild -O Name -T TypeName -N NodeName

# 以training节点为例，单据类型PT32,菜单编码PTH10302
$ ncbuild --out training --type PT32 --node PTH10302
```

支持参数为小写，如`PT32`,输入为`pt32`

通过以上操作，在`project`目录快速创建`training`节点模板。