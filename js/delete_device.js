/**
 * Created by zhan on 2016/7/6.
 */
$(function(){

});

var deleteDevice = {
    deviceId: ''
};

function deleteDeviceInfo(deviceId) {
    deleteDevice.deviceId = deviceId;
    YhHttp.init(YhHttpServiceCode.DELETE_DEVICE.CODE);
    YhHttp.send(deleteDevice, YhHttpServiceCode.DELETE_DEVICE.METHOD);
}

function deleteDeviceCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
            return;
        } else {
            console.log(result.parameter.message);
            resultInfo(result.parameter.status, result.parameter.message, 'device_list.html');
        }
    } else {
        errorInfo();
    }
};
