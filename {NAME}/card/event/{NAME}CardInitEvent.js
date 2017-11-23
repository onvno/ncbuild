/**
 * 页面加载
 */
define(
        [
                'cardpub',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/card/action/{NAME}CardPubActions.js',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/card/listener/{NAME}CardBeforeEditListener.js',
                ctx
                        + 'modules/{PROJECT}/{MENU}/resource/{NAME}/card/listener/{NAME}CardDefaultValueListener.js'

        ], function(pubCardPage, {NAME}CardPubActions,
                cardBeforeEditListener, cardDefaultValueListener) {
            return {
                init : function(param) {

                    var urlLink = rootUrl + "{PROJECT}/{MENU}/";

                    var data = { // 业务组初始化卡片页面传参(待定)
                        pub : {
                            hid : "pk_{DATA}",// 主表主键
                            bid : "pk_{DATA}_b",// 子表主键
                            module : "{PROJECT}",
                            param : param,
                            form : "#{NAME}_card_form",
                            billtype : "{TYPE}",
                            fullclassname : "nc.vo.{PROJECT}.{DATA}.Agg{UPPERDATA}",
                            vtrantypecode : "pk_billtypecode",
                            BCNavID : "#breadcrumbNav"// 面包屑导航区域
                        },
                        card : {
                        	showMore : false,
                            editColWidth : "100",// 操作列宽度
                            tmpl : {
                                // 加载单据模板查询条件
                                funcnode : "{NODE}",// 节点编码 必输
                                nodekey : "web_card" // 节点标示 可空
                            },
                            domid : {
                                pubCardNavID : "#cardnav",
                                pubCardHeadID : "#cardhead",
                                pubCardBodysID : {
                                    arr_{DATA}_b : "#body0"
                                },
                                pubCardUploadID : "#upload"
                            },
                            action : {
                                head : {NAME}CardPubActions.headActions(),
                                body : {
                                    arr_{DATA}_b : {NAME}CardPubActions.bodyActions()
                                },
                                inner : {
                                    arr_{DATA}_b : {NAME}CardPubActions.innerActions()
                                }
                            },
                            list : {
                                arr_{DATA}_b : {
                                    tabName : "{TABNAME}",// 页签名称
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
                    
                    // 新增默认值事件，必须注册在initUI之前,需要新增默认值的放开注释
                     // var _cardDefaultValueListener = new
                      //cardDefaultValueListener( _cardUtils, toCardParams);
                     // _pubCardPage.onSetDefaultValueWhenAdd(function() {
                     // _cardDefaultValueListener.doListener(); });
                     

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
