/**
 * Created by zhanghy7 on 2017/10/23.  发布按钮
 */
define([ 'listActionType', 'NCWebActionStyle', 'outPageRemind','MessageDialog',
    'alertStyle','webAjax'], function(
    listActionType, NCWebActionStyle, outPageRemind,
    MessageDialog,alertStyle,webAjax) {

    var ListBody{UPPERTYPE}Action = function(obj) {
        // 暂存用户自定义默认值事件
        this.funcal;
        this.implementsInterfaces = [ 'NCWebAction' ];
        this.style = NCWebActionStyle.DEFAULT;
        this.actionCode = obj.code;
        this.actionName = obj.name;
        this.isVisibleFunc = obj.isVisible;
        this.doActionFunc = obj.doAction;
        this.url = obj.url;
        if(!this.url){
            // 此处url为模板根据输入名称生成，需要和后端确认
            this.url = rootUrl + "webpub/pub/bill_list{TYPE}.do";
        }
    };

    ListBody{UPPERTYPE}Action.prototype.getCode = function() {

        if(this.actionCode){
            return this.actionCode;
        }
        // "BUTTON"为模板初始默认值，需要修改
        return "BUTTON";
    };

    ListBody{UPPERTYPE}Action.prototype.getName = function() {

        if(this.actionName){
            return this.actionName;
        }
        // "按钮"为模板初始默认值，需要修改
        return "按钮";
    };

    ListBody{UPPERTYPE}Action.prototype.doAction = function(param,callback) { // 实现必要的方法

        if (this.doActionFunc) {
            return this.doActionFunc(param);
        }

        // 以下为模板demo，根据需要重写(本例为publish发布demo)
        var that = this;
        var p = {};
        p.rowId = param.rowId;
        var data = param.listDataUtils.getCurrentData(p.rowId);
        if(!p.rowId){
            MessageDialog.showOkCancelDlg('请选中一行数据进行操作',{MessageDialog_OK:okWarnCallBack});
        }
        else{
            MessageDialog.showOkCancelDlg('是否要发布？',{MessageDialog_OK:okWarnOpenCallBack});
        }

        //“选中数据不为一条”提示框点击确认事件
        function okWarnCallBack(){
            return false;
        }

        //启用提示框点击确认事件
        function okWarnOpenCallBack() {
            //回掉函数
            var callBackFun = function(datas){
                if (datas.success) {
                    alertStyle.show('success', "发布成功");
                    param.listDataUtils.refreshDatas(param.defData);
                    callback.call();
                }
                else{
                    alertStyle.show('error', "发布失败");
                }
            };
            webAjax.send(that.url, JSON.stringify(data), false, callBackFun);
        }
    };

    ListBody{UPPERTYPE}Action.prototype.isVisible = function(param) {
        if(this.isVisibleFunc){
            return this.isVisibleFunc(param);
        }

        // 以下为模板，根据需要重写
        var flag = true;
        return flag;
    };

    return ListBody{UPPERTYPE}Action;
});
