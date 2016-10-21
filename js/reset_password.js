/**
 * Created by zhan on 2016/7/1.
 */
$(function(){
    var resetPsw = {
        phone: '',
        newPassword: '',
        validateCode: ''
    };

    if(window.location.href.split('?').length == 3) {
        var phone = window.location.href.split('?')[1].split('=')[1];
        var validateCode = window.location.href.split('?')[2].split('=')[1];
    }else{
        window.location.href = "forget_password.html";
    }

    $('#getPhone').val(phone);

    $('#reset').on('click', function(){

        if(!$('#resetPasswordInfo').valid()){
            return;
        }

        resetPsw.phone = $('#getPhone').val();
        resetPsw.newPassword = hex_md5($('#newPsw').val());
        resetPsw.validateCode = validateCode;
        YhHttp.init(YhHttpServiceCode.RESET_PASSWORD.CODE);
        YhHttp.send(resetPsw, YhHttpServiceCode.RESET_PASSWORD.METHOD);
    });

});

function resetPasswordCallBack(result){
    if(result != null && result != ''){
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            resultInfo(result.parameter.status, result.parameter.message, 'login.html');
        }
    } else {
        errorInfo();
    }
};

