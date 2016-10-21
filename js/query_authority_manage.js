/**
 * Created by zhan on 2016/7/4.
 */
$(function(){
    var queryAuthorityManage = {

    };

    YhHttp.init(YhHttpServiceCode.QUERY_AUTHORITY_MANAGE_LIST.CODE);
    YhHttp.send(queryAuthorityManage, YhHttpServiceCode.QUERY_AUTHORITY_MANAGE_LIST.METHOD);

    $('#applyAuthority').on('click', '.auth', function(){
        var userId = $(this).attr('data-userId');
        var deviceUuid = $(this).attr('data-uuid');
        var authType = $(this).attr('data-type');
        window.location.href = 'modify_authority.html?userId=' + userId + '?&deviceUuid=' + deviceUuid + '?&authType=' + authType;
    });
});

function queryAuthorityManageListCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            return;
        } else {
            var authorityList = result.parameter;
            var authorityTpl = $('#applyAuthorityTpl').html();
            var authorityHtml = juicer(authorityTpl, authorityList);
            $('#applyAuthority').html(authorityHtml);
        }
    } else {
        errorInfo();
    }
};
