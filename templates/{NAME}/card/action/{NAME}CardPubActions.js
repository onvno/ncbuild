/**
 * 按钮组装
 */
define(
    [
            'actionType',
            ctx + 'modules/webpub/pub/resource/action/card/editAction.js',
            ctx + 'modules/webpub/pub/resource/action/card/deleteAction.js',
            ctx + 'modules/webpub/pub/resource/action/card/saveAction.js',
            ctx+ 'modules/webpub/pub/resource/action/card/uploadFileAction.js',
            ctx+ 'modules/webpub/pub/resource/action/card/viewFileAction.js',
            ],
    function(actionType, editAction,
            deleteAction, saveAction,uploadFileAction,
            viewFileAction) {
        return {

            headActions : function() {

                // 刷新按钮新增取消时不显示
                var billrefresh_isVisible = function(viewModel, cardUtils) {
                    var isEditable = viewModel.isEditable();
                    var pk = cardUtils.getHeadValue(cardUtils.constant.HID);
                    var pkflag = false;
                    if (pk && pk.value) {
                        pkflag = true;
                    }
                    return !isEditable && pkflag;
                };

                var _editAction = new editAction({});

                var _deleteAction = new deleteAction({});

                var _saveAction = new saveAction({
                    mustBodys : true,
                    hasUploader : true,
                    hid : "pk_{DATA}"
                });
                var _uploadFileAction = new uploadFileAction();
                var _viewFileAction = new viewFileAction();
                var headAction = [ {
                    // 返回
                    code : actionType.COMEBACK.CODE
                }, {
                    // 更多
                    name : "更多",
                    actions : [ {
                        // 刷新
                        code : actionType.BILLREFRESH.CODE,
                        reWriteFun : [ {
                            funName : "isVisible",
                            implFun : billrefresh_isVisible
                        } ]
                    }, _deleteAction]
                }, _editAction, {
                    // 新增
                    code : actionType.ADD.CODE
                }, {
                    // 取消
                    code : actionType.CANCEL.CODE
                // 保存
                }, _saveAction ,_uploadFileAction, _viewFileAction];

                return headAction;
            },
            bodyActions : function() {
                var bodyAction = [ ];
                return bodyAction;
            },
            innerActions : function() {
                var innerAction = [];
                return innerAction;
            }
        }
    });
