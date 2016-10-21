/**
 * Created by zhan on 2016/7/5.
 */
$(function(){
    var queryDeviceModel = {

    };

    YhHttp.init(YhHttpServiceCode.QUERY_DEVICE_MODEL_LIST.CODE);
    YhHttp.send(queryDeviceModel, YhHttpServiceCode.QUERY_DEVICE_MODEL_LIST.METHOD);
});

function queryDeviceModelListCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            return;
        } else {
            var deviceList = result.parameter;
            var tpl = $('#deviceModelTpl').html();
            var deviceHtml = juicer(tpl, deviceList);
            $('#deviceModelSelect').html(deviceHtml);
        }
    } else {
        errorInfo();
    }
};