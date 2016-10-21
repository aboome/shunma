/**
 * Created by zhan on 2016/7/5.
 */
var queryWarningValue = {
    deviceId: '',
    deviceUuid: '',
    dataEnum: ''
};

function queryDeviceWarningConf(deviceId,deviceUuid) {

    queryWarningValue.deviceId = deviceId;
    queryWarningValue.deviceUuid = deviceUuid;
    queryWarningValue.dataEnum = dataEnum.temp;

    YhHttp.init(YhHttpServiceCode.QUERY_WARNING_CONFIG.CODE);
    YhHttp.send(queryWarningValue, YhHttpServiceCode.QUERY_WARNING_CONFIG.METHOD);
}

function queryWarningConfigCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            $('#topValue').html('未设置');
            $('#botValue').html('未设置');
        } else {
            var warnConfigList = result.parameter;
            if (typeof warnConfigList.list[0].warnTopValue != 'undefined'){
                $('#topValue').html(warnConfigList.list[0].warnTopValue+'&#8451;');
            }else{
                $('#topValue').html('未设置');
            }
            if (typeof warnConfigList.list[0].warnBottomValue != 'undefined') {
                $('#botValue').html(warnConfigList.list[0].warnBottomValue + '&#8451;');
            }else {
                $('#botValue').html('未设置');
            }
        }
    } else {
        errorInfo();
    }
}