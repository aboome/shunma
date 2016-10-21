/**
 * Created by zhan on 2016/7/9.
 */

var checkDeviceBind = {
    deviceUuid: ''
};

var checkDeviceBindResponse = {
    unbound : '0000',
    bound : '0002',
    already: '0003'
};

var lastInput = false;

$(function(){

    $('#ime-no').bind('input propertychange', function() {
        $('.device-is-bind').html('');
    });

    $('#ime-no').blur(function() {

        if(!$('#deviceUuid').valid()){
            return;
        }

        checkDeviceBind.deviceUuid = $('#ime-no').val();
        YHLayer.loading();
        $('#add-device').attr('disabled',"true");
        YhHttp.init(YhHttpServiceCode.CHECK_DEVICE_BIND.CODE);
        YhHttp.send(checkDeviceBind, YhHttpServiceCode.CHECK_DEVICE_BIND.METHOD);
    });
});

function checkDeviceIsBindCallBack(result){
    YHLayer.closeAllLayer();
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter == null || result.parameter == '') {
        } else {
            if(result.parameter.status == checkDeviceBindResponse.bound){

                $('.device-is-bind').html('');
                $('.device-is-bind').html('<label for="device-name" class="add-label">'+result.parameter.message+'</label>');

                $('#device-name').val(result.parameter.deviceName);
                $('#device-model').val(result.parameter.deviceModelId);
                $('#device-area').val(result.parameter.dpName);

                $('#device-name').attr("disabled","disabled");
                $('#device-model').attr("disabled","disabled");
                $('#device-area').attr("disabled","disabled");

                $('#add-device').removeAttr("disabled");

                lastInput = true;

            }else if (result.parameter.status == checkDeviceBindResponse.already){
                $('.device-is-bind').html('');
                $('.device-is-bind').html('<label for="device-name" class="add-label">'+result.parameter.message+'</label>');
                clearInput();
                lastInput = false;
            } else {
                $('.device-is-bind').html('');
                clearInput();
                lastInput = false;
                $('#add-device').removeAttr("disabled");
            }
        }
    } else {
        errorInfo();
    }
}

function clearInput() {

    if (lastInput){
        $('#device-name').val('');
        $('#device-model').val('');
        $('#device-area').val('');
    }

    $('#device-name').removeAttr("disabled");
    $('#device-model').removeAttr("disabled");
    $('#device-area').removeAttr("disabled");
}