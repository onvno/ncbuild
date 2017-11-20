/**
 * 卡片编辑前监听
 * 
 * @author yexun
 * @date 20170801
 */
define(
        [ ctx
                + 'modules/{PROJECT}/{MENU}/resource/{NAME}/card/filter/{NAME}CardReferFilter.js' ],
        function(cardReferFilter) {
            /**
             * 构造
             * 
             * @param cardUtils
             *            卡片工具
             */
            var listener = function(cardUtils) {
                if (!cardUtils) {
                    console.log('构造编辑前监听异常。cardUtils为空！');
                }
                this._cardUtils = cardUtils;
                this._cardReferFilter = new cardReferFilter(this._cardUtils);
            };
            /**
             * 监听编辑前事件
             * 
             * @param obj
             * @param datatable
             */
            listener.prototype.doListener = function(obj, datatable) {
                if (console) {
                    console.log("表头：编辑前事件");
                }
                // 参照过滤
                this._cardReferFilter.doFilter(obj, datatable);
            };
            return listener;
        });