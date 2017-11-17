/**
 * 页面入口js
 */
define(
        [
                'text!'
                        + ctx
                        + 'modules/party/dwmgr/resource/caugment/list/caugmentList.html',
                ctx
                        + 'modules/party/dwmgr/resource/caugment/list/event/caugmentListInitEvent.js',
                ctx
                        + 'modules/party/dwmgr/resource/caugment/list/event/caugmentListCloseEvent.js',
                'css!' + ctx + 'resource/billform/css/search.css',
                'css!' + ctx + 'resource/billform/css/sort.css',
                'css!' + ctx + 'resource/billform/css/headRegion.css',
                'css!' + ctx + 'resource/billform/css/list.css',
                'css!' + ctx + 'resource/billform/css/u-pagination.css',
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
            var _listDataUtils;
            var init = function(param) {
                _listDataUtils = initEvent.init(param)
            };
            var close = function() {
                return closeEvent.close(_listDataUtils);
            }
            return {
                'template' : template,
                'init' : init,
                'close' : close
            };
        });
