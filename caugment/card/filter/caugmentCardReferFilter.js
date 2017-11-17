/**
 * 卡片界面参照过滤
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
             * @param cardUtils
             *            卡片工具
             */
            var filter = function(cardUtils) {
                if (!cardUtils) {
                    console.log('构造卡片参照过滤器异常。cardUtils为空！');
                }
                this._cardUtils = cardUtils;
            };
            /**
             * 参照过滤
             * 
             * @param obj
             * @param datatable
             */
            filter.prototype.doFilter = function(obj, datatable) {
                if (console) {
                    console.log("表头：参照过滤");
                }
                var pk_org_obj = this._cardUtils.getHeadValue("pk_org");
                var pk_org = "";
                if (pk_org_obj) {
                    pk_org = pk_org_obj.value;
                }
                // 过滤条件参数
                var filterParam = {
                    // // 当前组织的已登记的应收票据
                    // pk_caugment : {
                    // filterFieldPart : [ {
                    // relationItemField : "pk_org",// 前端表格中的field
                    // refFilterField : "pk_org",// 后天数据库中的字段值
                    // treeOrGrid : "grid"
                    // } ],
                    // // 列表参照过滤
                    // gridParamMap : {
                    // module : "fbm",
                    // gridRefListener :
                    // "nc.fbm.ecds.endore.filter.EndoreFbmbillnoRefModelFilter",
                    // gridParamMap : {
                    // pk_org : pk_org,
                    // pk_caugment : pk_caugment,
                    // opbilltype : opbilltype
                    // }
                    // }
                    // },
                    // 组织权限
                    pk_org : {
                        treeParamMap : {
                            module : "fbm",
                            treeRefListener : "nc.lightapp.pubapp.web.template.ref.service.FinanceOrgRefListener"
                        }
                    }
                };
                // 调用referFilter方法
                referFilter(obj, filterParam, datatable);
            };
            return filter;
        });