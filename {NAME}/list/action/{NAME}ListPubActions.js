/**
 * 按钮组装
 */
define(
        [
                'listActionType',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listAddAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listDeleteAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyEditAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyDeleteAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyDetailAction.js',
                ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyPublishAction.js' ,
                 ctx
                        + 'modules/webpub/pub/resource/action/list/listBodyUnpublishAction.js' ],
        function(listActionType,listAddAction, listDeleteAction,
                listBodyEditAction, listBodyDeleteAction,listBodyDetailAction,listBodyPublishAction,listBodyUnpublishAction) {
            return {
                headActions : function() {
                    var billCardUrl = "{PROJECT}/{MENU}/resource/{NAME}/card/{NAME}CardUI";
                    var _listAddAction = new listAddAction({
                        url : billCardUrl
                    });
                    var _listDeleteAction = new listDeleteAction({});
                    var headAction = [  _listDeleteAction,_listAddAction ];
                    return headAction;
                },
                bodyActions : function() {
                    var billCardUrl = "{PROJECT}/{MENU}/resource/{NAME}/card/{NAME}CardUI";
                    var _listBodyEditAction = new listBodyEditAction({
                        url : billCardUrl
                    });
                    var _listBodyDeleteAction = new listBodyDeleteAction({});
                    var _listBodyDetailAction = new listBodyDetailAction({
                        url : billCardUrl
                    });
                    var _listBodyPublishAction = new listBodyPublishAction({});
                    var _listBodyUnpublishAction = new listBodyUnpublishAction({});
                    var bodyAction = [ _listBodyEditAction,
                            _listBodyDeleteAction,_listBodyPublishAction,_listBodyUnpublishAction,
                            _listBodyDetailAction ];
                    return bodyAction;
                }
            }
        });
