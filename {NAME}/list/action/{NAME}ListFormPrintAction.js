/**
 * Created by zhaozhao on 2017/3/24. 列表页新增
 */
define([ 'listActionType','alertStyle', 'MessageDialog', 'NCWebActionStyle',ctx
+ 'modules/webpub/pub/resource/common/metalmonthlyreportform/js/metalmonthlyreportform.js' ], function(listActionType,alertStyle,MessageDialog,
                                                                                   NCWebActionStyle,reportform) {
    var checkAction = function(obj) {
        // 暂存用户自定义新增默认值事件
        this.funcal;
        this.implementsInterfaces = [ 'NCWebAction' ];
        this.url = obj.url;
        this.actionCode = obj.code;
        this.actionName = obj.name;
        this.isVisibleFunc = obj.isVisible;
        this.doActionFunc = obj.doAction;
        reportform.init()

    };
    checkAction.prototype.getCode = function() {
        if (this.actionCode) {
            return this.actionCode;
        }
        return "PRINTREPORT";
    };
    checkAction.prototype.getName = function() {
        if (this.actionName) {
            return this.actionName;
        }
        return "打印报告表";
    };
    checkAction.prototype.doAction = function(param) { // 实现必要的方法
        if (this.doActionFunc) {
            return this.doActionFunc(param);
        }
        var datas = param.listDataUtils.getListDatas(param);
        if(datas.rows.length>1){
            alertStyle.show('warning', "只能选择一条数据");
            return;

        }else if((datas == null) || (datas.rows.length == 0)){
            alertStyle.show('warning', "请选择数据");
            return;
        }else {
            $("#metalmonthlyreportformModal").modal("show");
            reportform.setData(param,true)
        }
        // 执行用户自定义新增默认值函数
        if (this.funcal) {
            this.funcal();
        }
    };
    checkAction.prototype.isVisible = function(param) {
        /* if (this.isVisibleFunc) {
             return this.isVisibleFunc(param);
         }
         var flag = true;
         return flag;*/
        return true
    };
    // 新增设值默认值事件注册
    checkAction.prototype.onSetDefaultValueWhenAdd = function(listener) {
        this.funcal = listener;
    };
    return checkAction;
});
