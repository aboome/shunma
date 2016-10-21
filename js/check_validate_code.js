/**
 * Created by zhan on 2016/6/30.
 */
$(function () {
    var sendValidateCode = {
        phone: ''
    };
    var verifyValidateCodeCallBack = {
        validateCode: '',
        phone: ''
    };

    $('#sendCode').on('click', function () {
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
    $('.validateCode').on('click', function(){
        verifyValidateCode.phone = $('#userPhone').val();
        verifyValidateCode.validateCode = $('#checkCode').val();
        YhHttp.init(YhHttpServiceCode.VERIFY_VALIDATE_CODE.CODE);
        YhHttp.send(verifyValidateCode, YhHttpServiceCode.VERIFY_VALIDATE_CODE.METHOD);
    });
});

var sendValidateCode = {
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
            if(status == '0000'){
                /*history.go(0);*/
                layer.msg(result.parameter.message);
            } else {
                senCode(sendValidateCode);
            }
        }
    } else {
        errorInfo();
    }
};

function senCode(s){
    var phoneNum = $('#userPhone').val();
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    if(phoneNum == '' || phoneNum == null){
        layer.open({
            type: 1,
            title: false,
            closeBtn : 0,
            area: ['60%','160px'],
            shadeClose: false,
            content: '您没有输入手机号，不能发送验证码！',
            btn: ['确定']
        });
    } else if(!mobile.test(phoneNum)){
        layer.open({
            type: 1,
            title: false,
            closeBtn : 0,
            area: ['60%','160px'],
            shadeClose: false,
            content: '手机号码不正确，不能发送验证码！',
            btn: ['确定']
        });
    } else{
        s.phone = phoneNum;
        YhHttp.init(YhHttpServiceCode.SEND_VALIDATE_CODE.CODE);
        YhHttp.send(s, YhHttpServiceCode.SEND_VALIDATE_CODE.METHOD);

        countdown();
    }
}

function sendValidateCodeCallBack(result) {
    console.log(result);
    if (result != null && result != '') {
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            if (result.parameter.status == '0003'){
                layer.msg("发送验证码过于频繁,请稍后再试!");
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
        } else {}
    } else {
        errorInfo();
    }
};

var wait=60;
function countdown() {
    if (wait == 0) {
        $('.recheckCode').removeAttr("disabled");
        $('.recheckCode').val("重发验证码");
        wait = 60;
    } else {
        $('.recheckCode').attr("disabled", true);
        $('.recheckCode').val(wait + "秒后重新发送");
        wait--;
        setTimeout(function() {
                countdown();
            },
            1000)
    }
};