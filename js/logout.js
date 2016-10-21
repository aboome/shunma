/**
 * Created by zhan on 2016/7/5.
 */
$(function(){
    var logout ={

    };

    $('#logout').on('click', function(){
        YhHttp.init(YhHttpServiceCode.LOGOUT.CODE);
        YhHttp.send(logout, YhHttpServiceCode.LOGOUT.METHOD);
        window.location.href = 'login.html';

        $.cookie('username', '', {expires: -1, path: '/'});
        $.cookie('password', '', {expires: -1, path: '/'});
        $.cookie('userId', '', {expires: -1, path: '/'});
    });
});

function logoutCallBack(result){
    if(result != null && result != ''){
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            layer.msg(result.parameter.message, {icon: 4});
        }
    } else {
        errorInfo();
    }
};
