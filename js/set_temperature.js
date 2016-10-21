/**
 * Created by zhan on 2016/7/7.
 */
$(function () {


    if (window.location.href.split('?').length > 1) {
        setTemperature.deviceUuid = window.location.href.split('?')[2].split('=')[1];
        deviceId = window.location.href.split('?')[1].split('=')[1];
    }

    $('#set').on('click', function () {

        if (!$('#setTempInfo').valid()) {
            return;
        }

        var setTemp = $('#set-temp').val();

        var temperatureValue = setTemp * deviceControlCommand.multiple;

        if (0 > temperatureValue) {
            temperatureValue = "000000000" + temperatureValue;
            temperatureValue = "1" + temperatureValue.substr(temperatureValue.length - (deviceControlCommand.size - 1));
        } else {
            temperatureValue = "0000000000" + temperatureValue;
            temperatureValue = temperatureValue.substr(temperatureValue.length - deviceControlCommand.size);
        }

        setTemperature.controlEnum = dataEnum.setTemp;
        setTemperature.controlCommand = "CM0001DA" + setTemperature.controlEnum + temperatureValue + setTemperature.deviceUuid;

        YHLayer.loading();
        YhHttp.init(YhHttpServiceCode.SET_CONTROL_INFO.CODE);
        YhHttp.send(setTemperature, YhHttpServiceCode.SET_CONTROL_INFO.METHOD);
    });
});

var setTemperature = {
    deviceUuid: '',
    controlCommand: '',
    controlEnum: ''
};

var deviceId;

function setControlInfoCallBack(result) {
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
            return 0;
        } else {
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
