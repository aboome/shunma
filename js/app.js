/**
 * Created by zhan on 2016/6/27.
 */
$(function () {
    btnColor('.sm-btn', '#009591', '#57c4c7');
    btnColor('#logout', '#BF5252', '#DF6868');
});
function btnColor(btn, downColor, upColor) {
    $(btn).on('mousedown', function () {
        $(this).css({'backgroundColor': downColor, 'borderColor': downColor, 'color': '#fff', 'outline': 'none'});
    });
    $(btn).on('mouseup', function () {
        $(this).css({'backgroundColor': upColor, 'borderColor': upColor, 'color': '#fff', 'outline': 'none'});
    });
}

function resultInfo(sta, msg, href) {
    if (sta == '0000') {
        window.location.href = href;
    } else {
        layer.msg(msg);
    }
}

function errorInfo() {
    layer.msg('请求服务器异常！');
}

/* 统一登录功能 */
function checkLogin(re) {
    if (re == '9900') {
        window.location.href = 'login.html';
    }
};

var dataEnum = {
    temp: '01',
    setTemp: '09'
};

var deviceControlCommand = {
    size: 10,
    multiple: 10000
};

var auditResult = {
    auditPass: '10',
    auditReject: '20'
};

var dataDisContactTime = 45;

function formatDateString(date) {

    if(null == date){
        return null;
    }

    return date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8)+" "
        +date.substring(8,10)+":"+date.substring(10,12)+":"+date.substring(12,14);

}


/* 单选按钮 */
$('.sm-radio input').on('click', function () {
    isRadioChecked();
});
$('#readOnly-r').on('click', function () {
    if($('#control').is(':checked')) {
        $('#control-r').removeClass('radio-pic-checked');
        $('#control-r').addClass('radio-pic');
        $('#readOnly-r').removeClass('radio-pic');
        $('#readOnly-r').addClass('radio-pic-checked');
        $('#control').prop('checked', false);
        $('#readOnly').prop('checked', true);
    }
});
$('#control-r').on('click', function () {
    if($('#readOnly').is(':checked')) {
        $('#readOnly-r').removeClass('radio-pic-checked');
        $('#readOnly-r').addClass('radio-pic');
        $('#control-r').removeClass('radio-pic');
        $('#control-r').addClass('radio-pic-checked');
        $('#readOnly').prop('checked', false);
        $('#control').prop('checked', true);
    }
});
isRadioChecked();
function isRadioChecked() {
    if($('#readOnly').is(':checked')) {
        $('#control-r').removeClass('radio-pic-checked');
        $('#control-r').addClass('radio-pic');
        $('#readOnly-r').removeClass('radio-pic');
        $('#readOnly-r').addClass('radio-pic-checked');
    }
    if($('#control').is(':checked')) {
        $('#readOnly-r').removeClass('radio-pic-checked');
        $('#readOnly-r').addClass('radio-pic');
        $('#control-r').removeClass('radio-pic');
        $('#control-r').addClass('radio-pic-checked');
    }
};

$('#delete').hover(function () {
    $('#sm-icon-delete').removeClass('sm-icon-delete');
    $('#sm-icon-delete').addClass('sm-icon-delete-hover');
}, function () {
    $('#sm-icon-delete').removeClass('sm-icon-delete-hover');
    $('#sm-icon-delete').addClass('sm-icon-delete');
})
$('#modify').hover(function () {
    $('#sm-icon-modify').removeClass('sm-icon-modify');
    $('#sm-icon-modify').addClass('sm-icon-modify-hover');
}, function () {
    $('#sm-icon-modify').removeClass('sm-icon-modify-hover');
    $('#sm-icon-modify').addClass('sm-icon-modify');
})