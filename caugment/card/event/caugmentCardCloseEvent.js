/**
 * 页面关闭
 */
define(
    [],
    function() {
        return {
            close:function(cardUtils){
                return cardUtils.getInitPageParams();
            }
        }
    });
