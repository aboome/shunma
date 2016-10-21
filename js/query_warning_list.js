/**
 * Created by zhan on 2016/7/5.
 */
$(function(){
    var queryWarningList = {
        deviceId: '',
        pageNum: '',
        pageSize: ''
    };

/*    var value = window.location.href.split('?')[1];
    var deviceId = value.split('=')[1];*/


    /*queryWarningList.deviceId = deviceId;*/
    queryWarningList.pageNum = 1;
    queryWarningList.pageSize = 10;

    YhHttp.init(YhHttpServiceCode.QUERY_WARNING_LIST.CODE);
    YhHttp.send(queryWarningList, YhHttpServiceCode.QUERY_WARNING_LIST.METHOD);

});

function queryWarningListCallBack(result){
    if (result != null && result != '') {
        checkLogin(result.respCode);
        if (result.parameter.list == null || result.parameter.list == '') {
            return;
        } else {
            var warningList = result.parameter;
            var warningTpl = $('#warningListTpl').html();

            for (var i = 0; i< warningList.list.length;i++){
                warningList.list[i].createTime = formatDateString(warningList.list[i].createTime);
            }

            var warningHtml = juicer(warningTpl, warningList);
            $('#warningList').append(warningHtml);
        }
    } else {
        errorInfo();
    }
}
