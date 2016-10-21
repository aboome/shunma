/**
 * Created by zhan on 2016/7/5.
 */
var queryDeviceDetail = {
    deviceId: ''
};

var fromList = '';

function queryDeviceDetailInfo() {
    YHLayer.loading();
    YhHttp.init(YhHttpServiceCode.QUERY_DEVICE_DETAIL.CODE);
    YhHttp.send(queryDeviceDetail, YhHttpServiceCode.QUERY_DEVICE_DETAIL.METHOD);
}

$(function () {

    queryDeviceDetail.deviceId = window.location.href.split('?')[1].split('=')[1];
    queryDeviceDetailInfo();

    $('#warning-info').on('click', function () {
        window.location.href = 'warning_list.html';
    });

    $('#refresh').on('click', function () {
        queryDeviceDetailInfo();
        queryMemberBaseInfo();
    });

    $('#delete').on('click', function () {

        var content = '您确定要删除该设备吗？';

        if ('' == queryDeviceDetail.deviceId||null == queryDeviceDetail.deviceId){
            return;
        }

        layer.open({
            type: 1,
            title: false,
            area: ['80%','160px'],
            closeBtn : 0,
            shadeClose: false,
            content: content,
            btn: ['确定','取消'],
            yes: function(index, layero){
                deleteDeviceInfo(queryDeviceDetail.deviceId);
            },btn2: function(index, layero){
            }
        });
    });
});

function queryDeviceDetailCallBack(result) {
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {

            var deviceId = result.parameter.deviceId;
            var deviceUuid = result.parameter.deviceUuid;

            queryDeviceWarningConf(deviceId,deviceUuid);
            queryDeviceSensorDataInfo(deviceId,deviceUuid,dataEnum.temp);
            queryDeviceSensorDataInfo(deviceId,deviceUuid,dataEnum.setTemp);

            $('#deviceName').html(result.parameter.deviceName);
            $('#deviceModel').html(result.parameter.deviceModel);
            $('#deviceIME').html(deviceUuid);
            $('#dpName').html(result.parameter.dpName);

            $('#modify').attr('data-value', result.parameter.deviceModelId);

            $('#modify').on('click', function () {
                window.location.href = 'modify_device.html?deviceId=' + deviceId;
            });
            $('#setTopValue').on('click', function () {
                window.location.href = 'set_warning.html?deviceUuid=' + deviceUuid + '?deviceId=' + deviceId + '?dataEnum=' + dataEnum.temp;
            });
            $('#setBotValue').on('click', function () {
                window.location.href = 'set_warning.html?deviceUuid=' + deviceUuid + '?deviceId=' + deviceId + '?dataEnum=' + dataEnum.temp;
            });
            $('#set-temp').on('click', function () {
                window.location.href = 'set_temperature.html?deviceId=' + deviceId + '?&deviceUuid=' + deviceUuid;
            });

        }
    } else {
        errorInfo();
    }
}


