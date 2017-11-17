/**
 * 页面入口js
 */
define(
        [
                'text!'
                        + ctx
                        + 'modules/party/dwmgr/resource/caugment/card/caugmentCard.html',
                ctx
                        + 'modules/party/dwmgr/resource/caugment/card/event/caugmentCardInitEvent.js',
                ctx
                        + 'modules/party/dwmgr/resource/caugment/card/event/caugmentCardCloseEvent.js',
                'css!' + ctx + 'resource/billform/css/headRegion.css',
                'css!' + ctx + 'resource/billform/css/cardGrid.css',
                'css!' + ctx + 'resource/vendor/uui/css/u.css',
                'css!' + ctx + 'resource/vendor/uui/css/tree.css',
                'css!' + ctx + 'resource/vendor/uui/css/grid.css',
                'css!' + ctx + 'resource/vendor/uui/css/font-awesome.min.css',
                'css!' + ctx + 'resource/billform/css/uiref/ref.css',
                'css!' + ctx
                        + 'resource/billform/css/uiref/jquery.scrollbar.css',
                'css!'
                        + ctx
                        + 'resource/billform/css/dist/bootstrap/bootstrap-table.css' ],
        function(template, initEvent, closeEvent) {
            var cardUtils;
            var init = function(param) {
                cardUtils = initEvent.init(param)
            };
            var close = function() {
                return closeEvent.close(cardUtils);
            }
            return {
                'template' : template,
                'init' : init,
                'close' : close
            };
        });
