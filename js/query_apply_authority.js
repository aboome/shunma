/**
 * Created by zhan on 2016/7/4.
 */
$(function(){
    var queryApplicationAuth = {

    };
    
    YhHttp.init(YhHttpServiceCode.QUERY_APPLY_AUTHORITY_LIST.CODE);
    YhHttp.send(queryApplicationAuth, YhHttpServiceCode.QUERY_APPLY_AUTHORITY_LIST.METHOD);
});

function queryApplyAuthorityListCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            return;
        } else {
            var authorityList = result.parameter;
            var authorityTpl = $('#applicationTpl').html();
            var authorityHtml = juicer(authorityTpl, authorityList);
            $('#application').html(authorityHtml);
        }
    } else {
        errorInfo();
    }
};