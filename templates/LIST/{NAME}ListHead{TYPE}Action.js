/**
 * 列表 批量封存 Created by zhanghy7 on 2017/11/21
 */
define([ 'listActionType', 'alertStyle', 'webAjax', 'MessageDialog',
        ctx + 'modules/webpub/pub/resource/js/fbmListUtil.js',
         ],
        function(listActionType, alertStyle, webAjax, MessageDialog,
                fbmListUtil) {
            var ListBody{UPPERTYPE}Action = function(obj) {
                this.implementsInterfaces = [ 'NCWebAction' ];
                if (!obj) {
                    obj = {};
                }
                this.url = obj.url;
                if (!obj.url) {
                    // 此处url为模板根据输入名称生成，需要和后端确认
                    this.url = rootUrl + "webpub/pub/bill_list{TYPE}.do";
                    // this.url = rootUrl + "webpub/pub/bill_listseal.do";
                }

                this.actionCode = obj.code;
                this.actionName = obj.name;
                this.isVisibleFunc = obj.isVisible;
                this.doActionFunc = obj.doAction;

                this.ownField = obj.ownField || {};
                // 列表工具类
                this.fbmListUtil = new fbmListUtil({});
            };

            ListBody{UPPERTYPE}Action.prototype.getCode = function() {
                if (this.actionCode) {
                    return this.actionCode;
                }
                //return "batchSeal";
            };

            ListBody{UPPERTYPE}Action.prototype.getName = function() {
                if (this.actionName) {
                    return this.actionName;
                }
                //return "批量封存";
            };

            ListBody{UPPERTYPE}Action.prototype.doAction = function(param) { // 实现必要的方法
            	
            	var that = this;
            	 
                if (this.doActionFunc) {
                    return this.doActionFunc(param);
                }
                var datas = param.listDataUtils.getListDatas(param);
                
                // 以下为模板demo，根据需要重写（模板demo为lock封存）
                if ((datas == null) || (datas.rows.length == 0)) {
                    alertStyle.show('warning', "请选择封存的数据");
                    return false;
                } else {
                	var lockedDatas = [];
                	 datas.rows.map(function(item,index){
                		 var isseal = datas.rows[0].values.isseal.value;
                		 isseal == 'Y'?lockedDatas.push(item):null;
                     });
                	 if(lockedDatas.length>0){
                		 alertStyle.show('warning', "选择的单据中有已经封存的单据,“已经封存的单据”不能执行“封存”操作");
                		 return false;
                	 }
                }

                MessageDialog.showOkCancelDlg("确定封存？", {
                    MessageDialog_OK : okCallBack
                });
                function okCallBack() {
                    // 回掉函数
                    var callBackFun = function(datas) {
                        if (datas.success == true) {
                            param.listDataUtils.refreshPageDatas(param.defData);
                            alertStyle.show("success", that.getName() + "成功");
                        } else if (datas.error.message != null) {
                            alertStyle.show("error", datas.error.message);
                        } else {
                            alertStyle.show("error", that.getName() + "失败");
                        }
                    };
                    var rows =  datas.rows.map(function(item,index){
                    	item.status = 1;
                    	return item;
                    });
                    datas.rows = rows;
                    webAjax.send(that.url, datas, false, callBackFun);
                }
            };

            ListBody{UPPERTYPE}Action.prototype.isVisible = function(param) {
                if (this.isVisibleFunc) {
                    return this.isVisibleFunc(param);
                }

                // 以下为模板，根据需要重写
                var flag = true;
                return flag;
            };
            return ListBody{UPPERTYPE}Action;
        });
