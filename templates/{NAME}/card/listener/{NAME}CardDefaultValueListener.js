/**
 * 背书申请 新增默认值监听
 * 
 * @author yexun
 * @date 20170729
 */
define([ 'webAjax' ], function(webAjax) {
    /**
     * 构造
     * 
     * @param cardUtils
     *            卡片工具
     */
    var listener = function(cardUtils) {
        if (!cardUtils) {
            console.log('构造卡片新增默认值监听器异常。cardUtils为空！');
        }
        this._cardUtils = cardUtils;
        // 新增默认值url
        this.url = rootUrl + "{PROJECT}/{MENU}/{NAME}_carddefaultvalue.do";
    };
    /**
     * 新增默认值事件
     */
    listener.prototype.doListener = function() {
        if (console) {
            console.log("新增：获取默认值事件");
        }
        // 使用ajax请求获取默认值（VO），然后将VO值赋给前台
        var oid = this._cardUtils.constant.templateID;
        var data = this._cardUtils.getAllValue(oid);
        var that = this;
        // 回掉函数
        var callBackFun = function(datas) {
            if (datas.success) {
                if (console) {
                    console.log("获取默认值成功");
                }
                // 将默认值整体赋给页面
                var allData = datas.data;
                that._cardUtils.setAllValue(allData);
            } else {
                if (console) {
                    console.log("获取默认值失败：" + datas.error);
                }
            }
        };
        webAjax.send(this.url, data, false, callBackFun);
    };

    return listener;
});