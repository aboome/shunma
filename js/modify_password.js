/**
 * Created by zhan on 2016/7/1.
 */
$(function(){

    $('#change-psw').on('click', function () {

        if(!$('#modifyPasswordInfo').valid()){
            return
        }

        changePsw.oldPassword = hex_md5($('#oldPsw').val());
        changePsw.newPassword = hex_md5($('#newPsw').val());

        YHLayer.loading();

        YhHttp.init(YhHttpServiceCode.CHANGE_PASSWORD.CODE);
        YhHttp.send(changePsw, YhHttpServiceCode.CHANGE_PASSWORD.METHOD);
    });
});

var changePsw = {
    oldPassword: '',
    newPassword: ''
};

function changePasswordCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            if(result.parameter.status == '0000'){
                $.cookie('password', changePsw.newPassword, {expires: 7, path: '/'});
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn : 0,
                    area: ['60%','160px'],
                    shadeClose: false,
                    content: result.parameter.message,
                    btn: ['确定'],
                    yes: function () {
                        if(result.parameter.status == '0000'){
                            window.location.href = 'login.html';
                        }else {
                            YHLayer.closeAllLayer();
                        }
                    }
                });
            } else {
                layer.msg(result.parameter.message);
            }
        }
    } else {
        errorInfo();
    }
}