/**
 * Created by zhan on 2016/7/4.
 */
$(function(){
    var modifyAuthority = {
        userId: '',
        deviceUuid: '',
        authType: ''
    };

    if(window.location.href.split('?').length > 1){
        var id = window.location.href.split('?')[1];
        var uuid = window.location.href.split('?')[2];
        var type = window.location.href.split('?')[3];
        var userId = id.split('=')[1];
        var deviceUuid = uuid.split('=')[1];
        var authType = type.split('=')[1];
    }

    if(authType == '20'){
        $('#readOnly').attr('checked', true);
    } else {
        $('#control').attr('checked', true);
    }

    $('#mo-confirm').on('click', function () {
        modifyAuthority.userId = userId;
        modifyAuthority.deviceUuid = deviceUuid;
        modifyAuthority.authType = $('input[type="radio"]:checked').attr('value');
        YhHttp.init(YhHttpServiceCode.MODIFY_AUTHORITY_INFO.CODE);
        YhHttp.send(modifyAuthority, YhHttpServiceCode.MODIFY_AUTHORITY_INFO.METHOD);
    });
});

function modifyAuthorityInfoCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            var typeValue = $('input[type="radio"]:checked').attr('value');
            resultInfo(result.parameter.status, result.parameter.message, 'my_authority_manage.html?authType=' + typeValue);
        }
    } else {
        errorInfo();
    }
};
