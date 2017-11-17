/**
 * 查询区编辑前监听
 * 
 * @author yexun
 * @date 20170801
 */
define(
        [ ctx
                + 'modules/party/dwmgr/resource/caugment/list/filter/caugmentSearchReferFilter.js' ],
        function(searchReferFilter) {
            /**
             * 构造
             * 
             * @param cardUtils
             *            卡片工具
             */
            var listener = function(obj) {
                if (!obj || !obj.listDataUtil) {
                    console.log('构造编辑前监听异常。listDataUtils为空！');
                }
                this._listDataUtil = obj.listDataUtil;
                this._searchReferFilter = new searchReferFilter(obj);
            };
            /**
             * 监听编辑前事件
             * 
             * @param obj
             * @param datatable
             */
            listener.prototype.doListener = function(obj, datatable) {
                if (console) {
                    console.log("查询区：编辑前事件");
                }
                // 参照过滤
                this._searchReferFilter.doFilter(obj, datatable);
            };
            return listener;
        });