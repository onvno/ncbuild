/**
 * 按钮组装
 */
define(
        [
                'listActionType',
                ctx + 'modules/webpub/pub/resource/action/list/listAddAction.js',
                ctx + 'modules/webpub/pub/resource/action/list/listDeleteAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyCommitAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyUnCommitAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyEditAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyDeleteAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyDetailAction.js' ],
        function(listActionType, listAddAction, listDeleteAction,
                listBodyCommitAction, listBodyUnCommitAction,
                listBodyEditAction, listBodyDeleteAction, listBodyDetailAction) {
            return {
                headActions : function() {
                    var billCardUrl = "party/dwmgr/resource/caugment/card/caugmentCardUI";
                    var _listAddAction = new listAddAction({
                        url : billCardUrl
                    });
                    var headAction = [  _listAddAction];
                    return headAction;
                },
                bodyActions : function() {
                    var billCardUrl = "party/dwmgr/resource/caugment/card/caugmentCardUI";
                    var _listBodyEditAction = new listBodyEditAction({
                        url : billCardUrl
                    });
                    var _listBodyDeleteAction = new listBodyDeleteAction({});
                    var _listBodyCommitAction = new listBodyCommitAction({});
                    var _listBodyUnCommitAction = new listBodyUnCommitAction({});
                    var _listBodyDetailAction = new listBodyDetailAction({
                        url : billCardUrl
                    });
                    var bodyAction = [ _listBodyEditAction,
                            _listBodyDeleteAction, _listBodyCommitAction,
                            _listBodyUnCommitAction, _listBodyDetailAction ];
                    return bodyAction;
                }
            }
        });
