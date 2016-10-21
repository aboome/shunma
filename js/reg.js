/**
 * Created by zhan on 2016/6/30.
 */
$(function () {
    var register = {
        phone: '',
        userName: '',
        password: '',
        validateCode: ''
    };

    $('#register').on('click', function(){

        if(!$('#userInfo').valid()){
            return;
        }

        var phone = $('#userPhone').val();
        var password = hex_md5($('#regPsw').val());
        var validateCode = $('#checkCode').val();
        register.phone = phone;
        register.password = password;
        register.validateCode = validateCode;
        YhHttp.init(YhHttpServiceCode.REGISTER.CODE);
        YhHttp.send(register, YhHttpServiceCode.REGISTER.METHOD);
        $.cookie('username', phone, {expires: 7, path: '/'});
        $.cookie('password', password, {expires: 7, path: '/'});
    });
});

function registerCallBack(result) {
    if (result != null && result != '') {
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            resultInfo(result.parameter.status, result.parameter.message, 'device_list.html');
        }
    } else {

        errorInfo();
    }
};

function layerContent(){

}