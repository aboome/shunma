/**
 * Created by zhan on 2016/7/4.
 */
var queryReviewAuth = {

};

$(function(){


    YhHttp.init(YhHttpServiceCode.QUERY_AUDIT_AUTHORITY_LIST.CODE);
    YhHttp.send(queryReviewAuth, YhHttpServiceCode.QUERY_AUDIT_AUTHORITY_LIST.METHOD);

    $('#reviewAuthority').on('click','.review',function(){

        var obj = $(event.target).closest('li').find('.sm-btn-group');
        if(obj.css('display')=='block') return false;
        $('#reviewAuthority').find('.sm-btn-group').slideUp(300);
        obj.slideDown(300);
    });

    $('#reviewAuthority').on('click', '.agree', function(){
        var auditId = $(this).attr('data-auditId');
        window.location.href = 'operation_authority.html?auditId=' + auditId;
    });

    $('#reviewAuthority').on('click', '.refuse', function(){

        addReviewAuth.auditId = $(this).attr('data-auditId');
        addReviewAuth.auditResult = auditResult.auditReject;
        addReviewAuth.authType = '10';

        layer.open({
            type: 1,
            title: false,
            area: ['80%','160px'],
            closeBtn : 0,
            shadeClose: false,
            content: '确认拒绝该申请?',
            btn: ['确定','取消'],
            yes: function(index, layero){
                agreeApply(addReviewAuth);
            },btn2: function(index, layero){
            }
        });

    });
});

function queryAuditAuthorityListCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            return;
        } else {
            var authorityList = result.parameter;
            var authorityTpl = $('#reviewAuthorityTpl').html();
            var authorityHtml = juicer(authorityTpl, authorityList);
            $('#reviewAuthority').html(authorityHtml);
        }
    } else {
        errorInfo();
    }
}