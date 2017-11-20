/**
 * 按钮组装
 */
define(
        [
                'listActionType',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listPrintReviewAction.js',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/list/action/{NAME}ListCheckAction.js',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/list/action/{NAME}ListFormPrintAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listAddAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listDeleteAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyCommitAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyUnCommitAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyEditAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyDeleteAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyApprovelFlowDetailAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyDetailAction.js' ],
        function(listActionType, listPrintReviewAction, listCheckAction,
                listFormPrintAction, listAddAction, listDeleteAction,
                listBodyCommitAction, listBodyUnCommitAction,
                listBodyEditAction, listBodyDeleteAction,
                listBodyApprovelFlowDetailAction, listBodyDetailAction) {
            return {
                headActions : function() {
                    var billCardUrl = "{PROJECT}/{MENU}/resource/{NAME}/card/{NAME}CardUI";
                    var _listAddAction = new listAddAction({
                        url : billCardUrl
                    });
                    var _listDeleteAction = new listDeleteAction({});
                    var _checkAction = new listCheckAction({});
                    var printData = {};
                    printData.funcode = "{NODE}";// 节点编码
                    printData.nodekey = "web_print";// 模板标识
                    var _listPrintReviewAction = new listPrintReviewAction(
                            printData);
                    var _formPrintAction = new listFormPrintAction({});
                    var headAction = [ _listPrintReviewAction,
                            _formPrintAction, _checkAction, _listDeleteAction,
                            _listAddAction ];
                    return headAction;
                },
                bodyActions : function() {
                    var billCardUrl = "{PROJECT}/{MENU}/resource/{NAME}/card/{NAME}CardUI";
                    var _listBodyEditAction = new listBodyEditAction({
                        url : billCardUrl
                    });
                    var _listBodyDeleteAction = new listBodyDeleteAction({});
                    var _listBodyCommitAction = new listBodyCommitAction({});
                    var _listBodyUnCommitAction = new listBodyUnCommitAction({});
                    var _listBodyApprovelFlowDetailAction = new listBodyApprovelFlowDetailAction(
                            {});
                    var _listBodyDetailAction = new listBodyDetailAction({
                        url : billCardUrl
                    });
                    var bodyAction = [ _listBodyEditAction,
                            _listBodyDeleteAction, _listBodyCommitAction,
                            _listBodyUnCommitAction,
                            _listBodyApprovelFlowDetailAction,
                            _listBodyDetailAction ];
                    return bodyAction;
                }
            }
        });
