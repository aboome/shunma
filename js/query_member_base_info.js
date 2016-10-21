$(function(){
    queryMemberBaseInfo();
});

var queryMemberBase = {

};

function queryMemberBaseInfo() {

    YHLayer.loading();

    YhHttp.init(YhHttpServiceCode.QUERY_MEMBER_BASE_INFO.CODE);
    YhHttp.send(queryMemberBase, YhHttpServiceCode.QUERY_MEMBER_BASE_INFO.METHOD);

}

function queryMemberBaseInfoCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            $('#myAuditNo').html(result.parameter.myAuditNo);
            $('#myApplyNo').html(result.parameter.myApplyNo);
            $('#myWarnNo').html(result.parameter.myWarnNo);
            if(undefined == result.parameter.myWarnNo || 0 ==result.parameter.myWarnNo){
                $('#warning-info').find('img').attr('src','images/nowarning.png');
            }else {
                $('#warning-info').find('img').attr('src','images/warning.png');
            }
        }
    } else {
        errorInfo();
    }
}
