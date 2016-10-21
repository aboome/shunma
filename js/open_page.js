/**
 * Created by zhan on 2016/7/4.
 */
$(function () {
    $('#deviceList').on('click', function () {
        var active = $(this).parents('li').hasClass('active');
        if(!active){
            location.href = 'device_list.html';
        } else {
            return;
        }
    });
    $('#main').on('click', function () {
        var active = $(this).parents('li').hasClass('active');
        if(!active){
            location.href = 'main.html';
        } else {
            return;
        }
    });
    $('#userCenter').on('click', function () {
        var active = $(this).parents('li').hasClass('active');
        if(!active){
            location.href = 'user_center.html';
        } else {
            return;
        }
    });

    var un = $.cookie('username');
    $('#currentUser').html(un);

    $('#sm-top-nav').on('click', '.option-li', function () {
        var currentText = $(this).text();
        $('.placeholder').html(currentText);
    });

});