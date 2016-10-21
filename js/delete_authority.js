/**
 * Created by zhan on 2016/7/5.
 */
$(function(){
    var deleteAuthority = {
        userId: '',
        deviceUuid: ''
    };

    $('#delete').on('click', function () {
        var deleteText = $('#delete').attr('data-value');
        if(deleteText == '11'){
            $('#delete').attr('data-value' ,'00');
            $('#delete').html('取消');
            $('.deleteThis').css('display', 'inline-block');
        } else if (deleteText == '00'){
            $('#delete').attr('data-value' ,'11');
            $('#delete').html('删除');
            $('.deleteThis').css('display', 'none');
        };

    });

    $('#applyAuthority').on('click', '.deleteThis', function () {
        deleteAuthority.userId = $(this).attr('data-userId');
        deleteAuthority.deviceUuid = $(this).attr('data-uuid');
        YhHttp.init(YhHttpServiceCode.DELETE_AUTHORITY_INFO.CODE);
        YhHttp.send(deleteAuthority, YhHttpServiceCode.DELETE_AUTHORITY_INFO.METHOD);
    });
});

function deleteAuthorityInfoCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            resultInfo(result.parameter.status, result.parameter.message, 'my_authority_manage.html');
        }
    } else {
        errorInfo();
    }
}