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
    YHLayer.loading();
    YhHttp.init(YhHttpServiceCode.QUERY_WARNING_CONFIG.CODE);
    YhHttp.send(queryWarningValue, YhHttpServiceCode.QUERY_WARNING_CONFIG.METHOD);
}

$(function(){

    var deviceUuid = window.location.href.split('?')[1].split('=')[1];
    var deviceId = window.location.href.split('?')[2].split('=')[1];
    var dataEnum = window.location.href.split('?')[3].split('=')[1];

    if('' == deviceUuid||''== dataEnum){
        return;
    }

    queryDeviceWarningConf(deviceId,deviceUuid);

    $('#set-warning').on('click', function () {
        setWarning.deviceId = deviceId;
        setWarning.deviceUuid = deviceUuid;
        setWarning.dataEnum = dataEnum;
        setWarning.warnTopValue = $('#warning-max').val();
        setWarning.warnBottomValue = $('#warning-min').val();

        if(!$('#setWarn').valid()){
            return;
        }

        if ('' != setWarning.warnBottomValue&&'' != setWarning.warnTopValue&&(Number(setWarning.warnBottomValue)>=Number(setWarning.warnTopValue))){
            layer.msg("预警上限值应大于预警下限值!");
            return;
        }
        YHLayer.loading();
        YhHttp.init(YhHttpServiceCode.SET_WARNING_BOUNDS.CODE);
        YhHttp.send(setWarning, YhHttpServiceCode.SET_WARNING_BOUNDS.METHOD);
    });
});

var setWarning = {
    deviceId: '',
    deviceUuid: '',
    startTime: '',
    endTime: '',
    dataEnum: '',
    warnTopValue: '',
    warnBottomValue: ''
};

function setWarningBoundsCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            var deviceId = window.location.href.split('?')[2].split('=')[1];
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['60%', '160px'],
                shadeClose: false,
                content: result.parameter.message,
                btn: ['确定'],
                yes: function () {
                    if (result.parameter.status == '0000') {
                        window.location.href = 'main.html?deviceId=' + deviceId;
                    } else {
                        YHLayer.closeAllLayer();
                    }
                }
            });
        }
    } else {
        errorInfo();
    }
}

function queryWarningConfigCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
        } else {

            var warmList = result.parameter;

            $('#warning-max').val(warmList.list[0].warnTopValue);
            $('#warning-min').val(warmList.list[0].warnBottomValue);

        }
    } else {
        errorInfo();
    }
}