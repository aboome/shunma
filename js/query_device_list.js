/**
 * Created by zhan on 2016/7/4.
 */

var queryDevice = {
    userId: ''
};

$(function(){
    queryDeviceList();
});

function queryDeviceList() {

    queryDevice.userId = $.cookie('userId');
    YHLayer.loading();
    YhHttp.init(YhHttpServiceCode.QUERY_DEVICE_LIST.CODE);
    YhHttp.send(queryDevice, YhHttpServiceCode.QUERY_DEVICE_LIST.METHOD);

    $('#deviceHtml').on('click', '.device', function(){
        var deviceId = $(this).attr('data-id');
        window.location.href = 'main.html?deviceId=' + deviceId;
    });
}

function queryDeviceListCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
        } else {
            var deviceList = result.parameter;
            var tpl = $('#deviceTpl').html();
            var deviceHtml = juicer(tpl, deviceList);
            $('#deviceHtml').prepend(deviceHtml);
        }
    } else {
        errorInfo();
    }
}