/**
 * Created by zhan on 2016/7/5.
 */
$(function(){
    $('#forget-sendCode').on('click', function(){
        validatePhone.phone = $('#userPhone').val();
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        if(validatePhone.phone == '' || validatePhone.phone == null){
            return 0;
        } else if(!mobile.test(validatePhone.phone)){
            return 0;
        } else{
            YhHttp.init(YhHttpServiceCode.VALIDATE_PHONE.CODE);
            YhHttp.send(validatePhone, YhHttpServiceCode.VALIDATE_PHONE.METHOD);
        }
    });

    $('#next-reset').on('click', function () {

        if (!$('#forgetPasswordInfo').valid()){
            return;
        }

        var phone = $('#userPhone').val();
        var code = $('#checkCode').val();
        $.cookie('username', phone, {expires: 7, path: '/'});
        $.cookie('validateCode', code, {expires: 7, path: '/'});
        nextValidateCode.phone = phone;
        nextValidateCode.validateCode = code;
        YhHttp.init(YhHttpServiceCode.VERIFY_VALIDATE_CODE.CODE);
        YhHttp.send(nextValidateCode, YhHttpServiceCode.VERIFY_VALIDATE_CODE.METHOD);

    });
});

var nextValidateCode = {
    validateCode: '',
    phone: ''
};
var validatePhone = {
    phone: ''
};

function validatePhoneCallBack(result){
    if(result != null && result != ''){
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            var status = result.parameter.status;
            if(status != '0000'){
                /*history.go(0);*/
                layer.msg(result.parameter.message);
            } else {
                senCode(validatePhone);
            }
        }
    } else {
        errorInfo();
    }
};

function verifyValidateCodeCallBack(result) {
    if (result != null && result != '') {
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            resultInfo(result.parameter.status, result.parameter.message, 'reset_password.html?phone='+nextValidateCode.phone+'?&validateCode='+nextValidateCode.validateCode);
        }
    } else {
        errorInfo();
    }
};