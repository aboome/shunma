/**
 * Created by zhan on 2016/7/7.
 */
var queryDeviceSensorData = {
    deviceId: '',
    deviceUuid: '',
    dataEnum: ''
};

function queryDeviceSensorDataInfo(deviceId, deviceUuid, dataEnum) {
    queryDeviceSensorData.deviceId = deviceId;
    queryDeviceSensorData.deviceUuid = deviceUuid;
    queryDeviceSensorData.dataEnum = dataEnum;
    YhHttp.init(YhHttpServiceCode.QUERY_DEVICE_SENSOR_DATA.CODE);
    YhHttp.send(queryDeviceSensorData, YhHttpServiceCode.QUERY_DEVICE_SENSOR_DATA.METHOD);
}

function queryDeviceSensorDataInfoCallBack(result) {
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            $('#temp-num').html("N/A");
            $('#setTempValue').html("N/A");
        } else {
            var sensorDataList = result.parameter;
            if (dataEnum.temp == sensorDataList.list[0].dataEnum) {
                if (checkDataTime(parseDateString(sensorDataList.list[0].collectTime))){
                    $('#temp-num').html(sensorDataList.list[0].dataValue+'&#8451;');
                }else{
                    $('#temp-num').html("N/A");
                }
            }
            if (dataEnum.setTemp == sensorDataList.list[0].dataEnum) {
                if (typeof sensorDataList.list[0].dataValue != 'undefined' && checkDataTime(parseDateString(sensorDataList.list[0].collectTime))){
                    $('#setTempValue').html(sensorDataList.list[0].dataValue+'&#8451;')
                }else {
                    $('#setTempValue').html("N/A");
                }
            }
        }
    } else {
        errorInfo();
    }
}

function parseDateString(value) {
    if (value.length == 14) {
        return new Date(value.substring(0, 4) + "/" + value.substring(4, 6) + "/" + value.substring(6, 8) + " " + value.substring(8, 10) + ":" + value.substring(10, 12) + ":" + value.substring(12, 14));
    } else {
        return null;
    }
}

function checkDataTime(dataTime) {

    if (null == dataTime){
        return false;
    }

    var now = new Date();

    dataTime.setMinutes(dataTime.getMinutes() + dataDisContactTime);

    return now <= dataTime;
}