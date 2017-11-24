/**
 * 页面加载
 */
define(
        [
                'pubListPage',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/list/action/{NAME}ListPubActions.js',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/list/listener/{NAME}SearchBeforeEditListener.js',
                ctx + 'modules/webpub/pub/resource/js/listDblClickEventListener.js' ],
        function(pubListPage, sendinfosendListPubActions,
                listSearchBeforeEditListener, listDblClickEventListener) {
            return {
                init : function(param) {
                    var urlLink = rootUrl + "{PROJECT}/{MENU}/";
                    var data = { // 业务组初始化卡片页面传参
                        // 业务组初始化卡片页面传参
                        pub : {
                            hid : "pk_{DATA}",// pk字段
                            form : "#{NAME}_list_form",// 数据绑定区域
                            billtype : "{TYPE}", // 审批按钮会用，后续不会用到
                            fullclassname : "nc.vo.{PROJECT}.{DATA}.Agg{UPPERDATA}",
                            BCNavID : "#breadcrumbNav",// 面包屑导航区域
                            param : param
                        },
                        search : {
                            domid : "searchForm",
                            tmplUrl : rootUrl
                                    + "platform/template/billquery_query.do",
                            tmpl : {// 加载查询模板查询条件
                                funcnode : "{NODE}",// 节点编码 必输
                                nodekey : "" // 节点标示 可空
                            }
                        },
                        list : {
                            tmplUrl : rootUrl
                                    + "platform/template/billlist_query.do",
                            dataUrl : rootUrl
                                    + "platform/orm/billscheme_ncmutiquery.do",
                            domid : "dataForm",
                            listBodys : {
                                hid : "pk_{DATA}",// 主表主键字段
                                tabs : {// 页签编码
                                    arr_{DATA}_b : {
                                        selected : true,// 默认选中页签，有且只能有一个
                                        tabName : "{TABNAME}",// 页签名称
                                        showCount : false,// 是否显示数量
                                        domid : "#listbody0",// 页签显示位置domid
                                        editColWidth : "0",// 操作列宽度
                                        // 是否支持多选
                                        multiSelect : false
                                    }
                                },
                                tmpl : {// 加载卡片的子表模板
                                    funcnode : "{NODE}",// 节点编码 必输
                                    nodekey : "web_card" // 节点标识 可空
                                }
                            },
                            onDblClickFun : listDblClickEventListener.doListener,
                            // dblUrl :
                            // "{PROJECT}/{MENU}/resource/{NAME}/card/{NAME}CardUI",//
                            // 标准行双击事件跳转路由地址
                            // dblType : "detail",
                            // dblFuncode : "{NODE}",
                            initLoadDatas : true,// 打开页面是否默认加载业务数据
                            showCount : true,
                            editColWidth : 150,// 操作列宽度 --自适应
                            action : {
                                head : sendinfosendListPubActions.headActions(),
                                body : sendinfosendListPubActions.bodyActions()
                            },
                            tmpl : {// 加载查询模板查询条件
                                funcnode : "{NODE}",// 节点编码 必输
                                nodekey : "web_list" // 节点标示 可空
                            },
                            pageData : {// 默认查询条件
                                funcnode : "{NODE}",// 节点编码 必输
                                pageInfo : {
                                    currentPageIndex : 0,
                                    pageSize : 10
                                },
                                orders : [ {// 按照编码字段升序
                                    name : "vbillcode",
                                    ordertype : "desc"
                                } ],
                                defaultParams : // 默认查询条件本页面永久有效
                                []
                            }
                        }
                    };
                    // 初始化界面
                    var _pubListPage = new pubListPage(data);
                    var _listDataUtils = _pubListPage.init();

                    // 查询区编辑前事件
                    var _listSearchBeforeEditListener = new listSearchBeforeEditListener(
                            {
                                listDataUtil : _listDataUtils
                            });
                    _pubListPage.onSearchBeforeEdit(function(obj, datatable) {
                        _listSearchBeforeEditListener
                                .doListener(obj, datatable);
                    });
                    // // 查询区编辑后事件
                    // var _searchAfterEditListener = new
                    // searchAfterEditListener(
                    // {
                    // listDataUtil : _listDataUtils
                    // });
                    // _pubListPage.onSearchAfterEdit(function(obj) {
                    // _searchAfterEditListener.doListener(obj);
                    // });

                    return _listDataUtils;
                }
            };
        });
