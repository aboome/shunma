/**
 * Created by zhan on 2016/6/30.
 */
var YhHttpContent = {
    parameter: '',
    serviceCode: '',
    timestamp: '',
    uuid: ''
};
var YhHttp = {
    URL: 'http://10.10.150.150:8080/yh-iot-war/inner/open_api',
    // URL: 'http://127.0.0.1:8080/yh-iot-war/inner/open_api',
    init: function(code) {
        YhHttpContent.serviceCode = code;
        YhHttpContent.parameter = '';
        YhHttpContent.timestamp = '';
        YhHttpContent.uuid = '';
    },
    send: function(msg, methodName) {
        var paramString = JSON.stringify(msg);
        YhHttpContent.parameter = paramString;
        var sendString = 'innerMsg=' + JSON.stringify(YhHttpContent);
        var httpUrl = YhHttp.URL + '?callbackFunction=' + methodName;
        $.ajax({
            type: 'GET',
            url: httpUrl,
            async: false,
            dataType: 'jsonp',
            data: sendString,
            jsonp: methodName,
            contentType: "application/jsonp; charset=utf-8",
            success: function(o){},
            timeout:10000
        });
    }
};

var YhHttpServiceCode = {
    //公用（00）
    SEND_VALIDATE_CODE: {CODE: 'inner0000', METHOD: 'sendValidateCodeCallBack'},
    VERIFY_VALIDATE_CODE: {CODE: 'inner0001', METHOD: 'verifyValidateCodeCallBack'},
    //会员（01）
    REGISTER: {CODE: 'inner0100', METHOD: 'registerCallBack'},
    LOGIN: {CODE: 'inner0101', METHOD: 'loginCallBack'},
    CHANGE_PASSWORD: {CODE: 'inner0102', METHOD: 'changePasswordCallBack'},
    RESET_PASSWORD: {CODE: 'inner0103', METHOD: 'resetPasswordCallBack'},
    VALIDATE_PHONE: {CODE: 'inner0104', METHOD: 'validatePhoneCallBack'},
    LOGOUT: {CODE: 'inner0105', METHOD: 'logoutCallBack'},
    QUERY_MEMBER_BASE_INFO: {CODE:'inner0106',METHOD: 'queryMemberBaseInfoCallBack'},
    //设备（02）
    ADD_DEVICE: {CODE: 'inner0200', METHOD: 'addDeviceCallBack'},
    DELETE_DEVICE: {CODE: 'inner0201', METHOD: 'deleteDeviceCallBack'},
    QUERY_DEVICE_LIST: {CODE: 'inner0202', METHOD: 'queryDeviceListCallBack'},
    QUERY_DEVICE_DETAIL: {CODE: 'inner0203', METHOD: 'queryDeviceDetailCallBack'},
    MODIFY_DEVICE_INFO: {CODE: 'inner0204', METHOD: 'modifyDeviceInfoCallBack'},
    QUERY_DEVICE_MODEL_LIST: {CODE: 'inner0205', METHOD: 'queryDeviceModelListCallBack'},
    CHECK_DEVICE_BIND: {CODE: 'inner0206', METHOD: 'checkDeviceIsBindCallBack'},
    //监测（03）
    QUERY_DEVICE_SENSOR_DATA: {CODE: 'inner0300',METHOD: 'queryDeviceSensorDataInfoCallBack'},
    //控制（04）
    SET_CONTROL_INFO: {CODE: 'inner0400', METHOD: 'setControlInfoCallBack'},
    QUERY_CONTROL_INFO: {CODE: 'inner0401', METHOD: 'queryControlInfoCallBack'},
    //预警（05）
    SET_WARNING_BOUNDS: {CODE: 'inner0500', METHOD: 'setWarningBoundsCallBack'},
    QUERY_WARNING_LIST: {CODE: 'inner0501', METHOD: 'queryWarningListCallBack'},
    QUERY_WARNING_CONFIG: {CODE: 'inner0502', METHOD: 'queryWarningConfigCallBack'},
    //权限（06）
    ADD_AUDIT_AUTHORITY_INFO: {CODE: 'inner0600', METHOD: 'addAuditAuthorityInfoCallBack'},
    MODIFY_AUTHORITY_INFO: {CODE: 'inner0601', METHOD: 'modifyAuthorityInfoCallBack'},
    DELETE_AUTHORITY_INFO: {CODE: 'inner0602', METHOD: 'deleteAuthorityInfoCallBack'},
    QUERY_APPLY_AUTHORITY_LIST: {CODE: 'inner0603', METHOD: 'queryApplyAuthorityListCallBack'},
    QUERY_AUDIT_AUTHORITY_LIST: {CODE: 'inner0604', METHOD: 'queryAuditAuthorityListCallBack'},
    QUERY_AUTHORITY_MANAGE_LIST: {CODE: 'inner0605', METHOD: 'queryAuthorityManageListCallBack'},
    QUERY_AUDIT_DETAIL:{CODE: 'inner0606',METHOD: 'queryAuditDetailCallBack'}
};