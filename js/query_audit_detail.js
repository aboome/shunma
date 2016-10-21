$(function(){
    queryAuditInfo();
});

var queryAuditDetail = {
    auditId:''
};

function queryAuditInfo() {

    queryAuditDetail.auditId = window.location.href.split('?')[1].split('=')[1];

    YHLayer.loading();

    YhHttp.init(YhHttpServiceCode.QUERY_AUDIT_DETAIL.CODE);
    YhHttp.send(queryAuditDetail, YhHttpServiceCode.QUERY_AUDIT_DETAIL.METHOD);

}

function queryAuditDetailCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            $('#userName').html(result.parameter.applyUserName);
            $('#deviceName').html(result.parameter.deviceName);
            $('#deviceUuid').html(result.parameter.deviceUuid);
            $('#applyTime').html(formatDateString(result.parameter.createTime));
        }
    } else {
        errorInfo();
    }
}
