/**
 * 按钮组装
 */
define(
        [
                'actionType',
                ctx + 'modules/webpub/pub/resource/action/card/commitAction.js',
                ctx + 'modules/webpub/pub/resource/action/card/unCommitAction.js',
                ctx + 'modules/webpub/pub/resource/action/card/editAction.js',
                ctx + 'modules/webpub/pub/resource/action/card/deleteAction.js',
                ctx + 'modules/webpub/pub/resource/action/card/saveAction.js',
                        ],
        function(actionType, commitAction, unCommitAction, editAction,
                deleteAction, saveAction) {
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

                    var _commitAction = new commitAction({});

                    var _unCommitAction = new unCommitAction({});

                    var _editAction = new editAction({});

                    var _deleteAction = new deleteAction({});

                    var _saveAction = new saveAction({
                        hasUploader : true,
                        hid : "pk_caugment"
                    });
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
                        }, _deleteAction, _unCommitAction ]
                    // 修改
                    }, _commitAction, _editAction, {
                        // 新增
                        code : actionType.ADD.CODE
                    }, {
                        // 取消
                        code : actionType.CANCEL.CODE
                    // 保存
                    }, _saveAction ];

                    return headAction;
                },
                bodyActions : function() {
                    var bodyAction = [ {
                        code : actionType.DELLINE.CODE
                    }, {
                        code : actionType.ADDLINE.CODE
                    } ];
                    return bodyAction;
                },
                innerActions : function() {
                    var innerAction = [];
                    return innerAction;
                }
            }
        });
