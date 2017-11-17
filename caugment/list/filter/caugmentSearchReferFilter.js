/**
 * 查询区参照、下拉过滤
 * 
 * @author yexun
 * @date 20170729
 */
define(
        [ 'referFilter' ],
        function(referFilter) {
            /**
             * 构造
             * 
             * @param obj
             *            列表工具
             */
            var filter = function(obj) {
                if (!obj || !obj.listDataUtil) {
                    console.log('构造编辑前监听异常。listDataUtils为空！');
                }
                this._listDataUtil = obj.listDataUtil;
            };
            /**
             * 参照过滤
             * 
             * @param obj
             * @param datatable
             */
            filter.prototype.doFilter = function(obj, datatable) {
                if (console) {
                    console.log("查询区：参照过滤");
                }
                switch (obj) {
                case "search_pk_org":
                    var referFilterParam = {
                        search_pk_org : {
                            treeParamMap : {
                                module : "party",
                                treeRefListener : "nc.lightapp.pubapp.web.template.ref.service.FinanceOrgRefListener"
                            }
                        }
                    };
                    referFilter(obj, referFilterParam, datatable);
                    break;
                }
            };
            return filter;
        });