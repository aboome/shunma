/**
 * Created by zhan on 2016/7/1.
 */
$(function(){

    var un = $.cookie('username');
    var pw = $.cookie('password');
    if(un != null && un != '' && typeof(un) != 'undefined' && pw != null && pw !='' && typeof(pw) != 'undefined'){
        login.userName = un;
        login.password = pw;
        loginAuto();
    }

    $('#login').on('click', function(){

        if(!$('#loginInfo').valid()){
            return 0;
        }

        login.userName = $('#username').val();
        login.password = hex_md5($('#password').val());
        loginAuto();
    });

    function loginAuto(){
        YHLayer.loading();
        YhHttp.init(YhHttpServiceCode.LOGIN.CODE);
        YhHttp.send(login, YhHttpServiceCode.LOGIN.METHOD);
    }
});

var login = {
    userName: '',
    password: ''
};

function loginCallBack(result){
    YHLayer.closeAllLayer();
    if(result != null && result != ''){
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
            return 0;
        } else {
            if(result.parameter.status == '0000'){
                $.cookie('username', login.userName, {expires: 7, path: '/'});
                $.cookie('password', login.password, {expires: 7, path: '/'});
                $.cookie('userId', result.parameter.userId, {expires: 7, path: '/'});
                window.location.href = 'device_list.html';
            } else {
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn : 0,
                    area: ['60%','160px'],
                    shadeClose: false,
                    content: result.parameter.message,
                    btn: ['确定']
                });
            }
        }
    } else {
        errorInfo();
    }
}

