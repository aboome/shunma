/**
 * Created by zhan on 2016/7/5.
 */
$(function () {

    $('#add-device').attr('disabled',"true");
    queryDeviceDetailInfo();

    $('#modify-device').on('click', function () {
        $('#add-device').attr('disabled',"true");
        modifyDeviceInfo();
    });
});

var modifyDevice = {
    deviceId: '',
    deviceName: '',
    deviceModelId: '',
    dpName: ''
};

function queryDeviceDetailInfo() {

    if (window.location.href.split('?').length > 1) {
        var id = window.location.href.split('?')[1];
        var deviceId = id.split('=')[1];
    } else {
        return;
    }

    YHLayer.loading();
    queryDeviceDetail.deviceId = deviceId;
    YhHttp.init(YhHttpServiceCode.QUERY_DEVICE_DETAIL.CODE);
    YhHttp.send(queryDeviceDetail, YhHttpServiceCode.QUERY_DEVICE_DETAIL.METHOD);

}

function modifyDeviceInfo() {

    if (!$('#modifyDevice').valid()) {
        return;
    }

    modifyDevice.deviceId = queryDeviceDetail.deviceId;
    modifyDevice.deviceName = base64encode(utf16to8($('#mo-device-name').val()));
    modifyDevice.deviceModelId = $('#device-model').val();
    modifyDevice.dpName = base64encode(utf16to8($('#mo-device-area').val()));
    YHLayer.loading();
    YhHttp.init(YhHttpServiceCode.MODIFY_DEVICE_INFO.CODE);
    YhHttp.send(modifyDevice, YhHttpServiceCode.MODIFY_DEVICE_INFO.METHOD);

}

var queryDeviceDetail = {
    deviceId: ''
};

function modifyDeviceInfoCallBack(result) {
    YHLayer.closeAllLayer();
    $('#add-device').removeAttr("disabled");
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
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
                        window.location.href = 'main.html?deviceId=' + queryDeviceDetail.deviceId;
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

function queryDeviceDetailCallBack(result) {
    YHLayer.closeAllLayer();
    $('#add-device').removeAttr("disabled");
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            var deviceName = result.parameter.deviceName;
            var deviceModelId = result.parameter.deviceModelId;
            var dpName = result.parameter.dpName;

            $('#mo-device-name').val(deviceName);
            $('#device-model').val(deviceModelId);
            $('#mo-device-area').val(dpName);

        }
    } else {
        errorInfo();
    }
}