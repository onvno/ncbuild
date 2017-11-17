/**
 * 页面加载
 */
define(
        [
                'cardpub',
                ctx
                        + 'modules/party/dwmgr/resource/caugment/card/action/caugmentCardPubActions.js',
                ctx
                        + 'modules/party/dwmgr/resource/caugment/card/listener/caugmentCardBeforeEditListener.js',
//                ctx
//                        + 'modules/party/dwmgr/resource/caugment/card/listener/caugmentCardDefaultValueListener.js'

        ], function(pubCardPage, caugmentCardPubActions,
                cardBeforeEditListener
//                cardDefaultValueListener
                ) {
            return {
                init : function(param) {

                    var urlLink = rootUrl + "party/dwmgr/";

                    var data = { // 业务组初始化卡片页面传参(待定)
                        pub : {
                            hid : "pk_caugment",// 主表主键
//                            bid : "pk_caugment_b",// 子表主键
                            module : "party",
                            param : param,
                            form : "#caugment_card_form",
                            billtype : "PT26",
                            fullclassname : "nc.vo.party.caugment.AggCaugment",
                            vtrantypecode : "pk_billtypecode",
                            BCNavID : "#breadcrumbNav"// 面包屑导航区域
                        },
                        card : {
                            editColWidth : "100",// 操作列宽度
                            tmpl : {
                                // 加载单据模板查询条件
                                funcnode : "PTH10206",// 节点编码 必输
                                nodekey : "web_card" // 节点标示 可空
                            },
                            domid : {
                                pubCardNavID : "#cardnav",
                                pubCardHeadID : "#cardhead",
                                pubCardBodysID : {
                                    arr_caugment_b : "#body0"
                                },
                                pubCardUploadID : "#upload"
                            },
                            action : {
                                head : caugmentCardPubActions.headActions(),
                                body : {
                                    arr_caugment_b : caugmentCardPubActions
                                            .bodyActions(),
                                },
                                inner : {
                                    arr_caugment_b : caugmentCardPubActions
                                            .innerActions()
                                }
                            },
                            list : {
                                arr_caugment_b : {
                                    multiSelect : true
                                }
                            },
                            title : {
                                upload : "附件管理"
                            }
                        }

                    };
                    // 初始化界面
                    var _pubCardPage = new pubCardPage(data);
                    var _cardUtils = _pubCardPage.getCardUtils();
                    var toCardParams = {};
                    if (typeof param === "string") {
                        toCardParams = JSON.parse(param);
                    } else if (typeof param === "object") {
                        toCardParams = param;
                    }
                    // 新增默认值事件，必须注册在initUI之前
                    
//                      var _cardDefaultValueListener = new
//                      cardDefaultValueListener( _cardUtils, toCardParams);
//                      _pubCardPage.onSetDefaultValueWhenAdd(function() {
//                      _cardDefaultValueListener.doListener(); });
                     

                    // // 表头编辑后事件
                    // var _cardAfterEditListener = new cardAfterEditListener(
                    // _cardUtils);
                    // _pubCardPage.onHeadAfterEdit(function(event) {
                    // _cardAfterEditListener.doListener(event);
                    // });
                    // 表头编辑前事件
                    var _cardBeforeEditListener = new cardBeforeEditListener(
                            _cardUtils);
                    _pubCardPage.onHeadBeforeEdit(function(obj, datatable) {
                        _cardBeforeEditListener.doListener(obj, datatable);
                    });

                    _pubCardPage.initUI();
                    return _cardUtils;
                }
            };
        });
