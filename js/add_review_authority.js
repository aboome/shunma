/**
 * Created by zhan on 2016/7/4.
 */
var addReviewAuth = {
    auditId:'',
    authType: '',
    auditResult: '',
    auditIdea: ''
};

$(function () {

    $('#mo-confirm').on('click', function () {

        addReviewAuth.auditId = window.location.href.split('?')[1].split('=')[1];
        addReviewAuth.authType = $('input[type="radio"]:checked').attr('value');
        addReviewAuth.auditResult = auditResult.auditPass;

        agreeApply(addReviewAuth);
    });

});

function agreeApply(addReviewAuth) {

    YHLayer.loading();

    YhHttp.init(YhHttpServiceCode.ADD_AUDIT_AUTHORITY_INFO.CODE);
    YhHttp.send(addReviewAuth, YhHttpServiceCode.ADD_AUDIT_AUTHORITY_INFO.METHOD);
}

function addAuditAuthorityInfoCallBack(result) {
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            resultInfo(result.parameter.status, result.parameter.message, 'my_audit.html');
        }
    } else {
        errorInfo();
    }
}