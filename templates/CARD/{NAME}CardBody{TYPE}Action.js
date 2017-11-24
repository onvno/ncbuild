/**
 * Created by zhangcheng on 2017/3/22.
 */
define([ 'actionType', 'alertStyle', 'webAjax','MessageDialog', 'NCWebActionStyle' ],
        function(actionType, alertStyle, webAjax,MessageDialog, NCWebActionStyle) {
            var CardBody{UPPERTYPE}Action = function(obj) {
                this.serviceProxy;
                this.constantEnum;
                this.implementsInterfaces = [ 'NCWebAction' ];
                if (!obj) {
                    obj = {};
                }
                this.url = obj.url;
                if (!obj.url) {
                    // 此处url为模板根据输入名称生成，需要和后端确认
                    this.url = rootUrl + "webpub/pub/bill_card{TYPE}.do";
                }
                this.actionCode = obj.code;
                this.actionName = obj.name;
                this.setParaFunc = obj.setPara;
                this.isVisibleFunc = obj.isVisible;
                this.doActionFunc = obj.doAction;
                this.ownField = obj.ownField || {};
                if (!obj.style) {
                    this.style = NCWebActionStyle.GRAY;
                } else {
                    this.style = obj.style;
                }
            };
            
            CardBody{UPPERTYPE}Action.prototype.getCode = function() {
                if (this.actionCode) {
                    return this.actionCode;
                }
                // "BUTTON"为模板初始默认值，需要修改
                return "BUTTON";
            };
            
            CardBody{UPPERTYPE}Action.prototype.getName = function() {
                if (this.actionName) {
                    return this.actionName;
                }
                // "按钮"为模板初始默认值，需要修改
                return "按钮";
            };
            
            CardBody{UPPERTYPE}Action.prototype.setPara = function(para) {
                if (this.setParaFunc) {
                    this.constantEnum = this.setParaFunc(para)
                    return;
                }
                this.constantEnum = para.constant;
                this.serviceProxy = para.serviceProxy;
            };

            CardBody{UPPERTYPE}Action.prototype.doAction = function(viewModel, cardUtils,
                    dataTable, defPara, callback) { // 实现必要的方法
                if (this.doActionFunc) {
                    return this.doActionFunc(viewModel, cardUtils, dataTable,
                            defPara, callback);
                }

                var oid = this.constantEnum.templateID;
                var bill = cardUtils.getAllValue(oid);
                var that = this;

                // 此处写入自定义按钮的逻辑代码
                
            };
            
            CardBody{UPPERTYPE}Action.prototype.isVisible = function(viewModel, cardUtils) {
                if (this.isVisibleFunc) {
                    return this.isVisibleFunc(viewModel, cardUtils);
                }
                
                // 以下为模板，根据需要重写
                var flag = true;
                return flag;
            };
            
            return CardBody{UPPERTYPE}Action;
        });
