/**
 * Created by zhan on 2016/7/1.
 */
var addDevice = {
    userId: '',
    deviceName: '',
    deviceModel: '',
    deviceUuid: '',
    dpName: ''
};

$(function(){

    $('#add-device').on('click', function(){

        if(!$('#deviceUuid').valid()){
            return;
        }

        if(!$('#addDevice').valid()){
            return;
        }

        $('#add-device').attr('disabled',"true");
        YHLayer.loading();
        addDevice.deviceName = base64encode(utf16to8($('#device-name').val()));
        addDevice.deviceModel = $('#device-model').val();
        addDevice.deviceUuid = $('#ime-no').val();
        addDevice.dpName = base64encode(utf16to8($('#device-area').val()));
        YhHttp.init(YhHttpServiceCode.ADD_DEVICE.CODE);
        YhHttp.send(addDevice ,YhHttpServiceCode.ADD_DEVICE.METHOD);
    });

});

function addDeviceCallBack(result) {
    YHLayer.closeAllLayer();
    $('#add-device').removeAttr("disabled");
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            layer.open({
                type: 1,
                title: false,
                closeBtn : 0,
                area: ['60%','160px'],
                shadeClose: false,
                content: result.parameter.message,
                btn: ['确定'],
                yes: function () {
                    if(result.parameter.status == '0000'){
                        window.location.href = 'device_list.html';
                    }else {
                        YHLayer.closeAllLayer();
                    }
                }
            });
        }
    } else {
        errorInfo();
    }
}