/**
 * Created by zhan on 2016/6/30.
 */

// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

//密码
jQuery.validator.addMethod("isPassword", function(value, element) {
    var length = value.length;
    var password = /^\w{6,20}$/;
    return this.optional(element) || (password.test(value));
}, "密码必须是字母、数字和下划线组合");

jQuery.validator.addMethod("isTemperature",function(value,element) {
    var temp = /^(\+|-)?([0-9]{1,3})(\.[0-9])?$/;
    return this.optional(element) || (temp.test(value));
},"请输入合适的值(-999.9~999.9,保留一位小数)");

jQuery.validator.addMethod("setTemperature",function (value,element) {
    var temp = /^((300)|((1|2)?([0-9]{1,2})(\.[0-9])?))$/;
    return this.optional(element) || (temp.test(value));
},"请输入合适的值(0-300,保留一位小数)");

// 不相等
jQuery.validator.addMethod("notEqualTo", function(value, element,param) {
    return value != $(param).val();
}, $.validator.format("新密码不能和原密码相同"));

$(function () {
    $('#userInfo').validate({
        rules: {
            userPhone: {
                required: true,
                // 自定义方法：校验手机号在数据库中是否存在
                //checkPhoneExist: true,
                isMobile: true
            },
            checkCode: {
                digits: true,
                minlength: 6,
                required: true
            },
            password: {
                required: true,
                rangelength: [6, 20],
                isPassword: true
            },
            password_confirm: {
                required: true,
                rangelength: [6, 20],
                equalTo: "#regPsw"
            }
        },
        messages: {
            password: {
                rangelength: '密码长度为 6 到 20 个字符之间'
            },
            password_confirm: {
                rangelength: '密码长度为 6 到 20 个字符之间',
                equalTo: '请保证两次输入的密码相同'
            }
        }
    });

    $('#loginInfo').validate({
        rules: {
            username: {
                required: true,
                maxlength: 11,
                isMobile: true
            },
            password: {
                required: true,
                rangelength: [6, 20],
                isPassword: true
            }
        }
    });

    $('#forgetPasswordInfo').validate({
        rules: {
            userPhone: {
                required: true,
                maxlength: 11,
                isMobile: true
            },
            checkCode: {
                digits: true,
                minlength: 6,
                required: true
            }
        },
        message: {
            userPhone: {
                maxlength: '请输入正确的11位手机号'
            },
            checkCode: {
                minlength: '验证码为6位'
            }
        }
    });

    $('#resetPasswordInfo').validate({
        rules: {
            newPassword: {
                required: true,
                rangelength: [6, 20],
                isPassword: true
            },
            confirmPassword: {
                required: true,
                rangelength: [6, 20],
                equalTo: "#newPsw"
            }
        },
        message: {
            newPassword: {
                rangelength: '密码长度为 6 到 20 个字符之间'
            },
            confirmPassword: {
                rangelength: '密码长度为 6 到 20 个字符之间',
                equalTo: '请保证两次输入的密码相同'
            }
        }
    });

    $('#modifyPasswordInfo').validate({
        rules: {
            oldPassword: {
                required: true,
                rangelength: [6, 20],
                isPassword: true
            },
            newPassword: {
                required: true,
                rangelength: [6, 20],
                isPassword: true,
                notEqualTo: "#oldPsw"
            },
            confirmPassword: {
                required: true,
                rangelength: [6, 20],
                equalTo: "#newPsw"
            }
        },
        message: {
            oldPassword: {
                rangelength: '密码长度为 6 到 20 个字符之间'
            },
            newPassword: {
                rangelength: '密码长度为 6 到 20 个字符之间',
                notEqualTo: '新密码不能和原密码相同'
            },
            confirmPassword: {
                rangelength: '密码长度为 6 到 20 个字符之间',
                equalTo: '请保证两次输入的密码相同'
            }
        }
    });

    $('#deviceUuid').validate({
        rules: {
            imeNo: {
                required: true,
                rangelength: [16, 32],
                imeNoType: true
            }
        },
        message: {
            imeNo: {
                rangelength: '设备IME号长度为 16 到 32 个字符之间'
            }
        }
    });

    $('#addDevice').validate({
        rules: {
            deviceName: {
                required: true,
                maxlength: 40
            },
            deviceModel :{
                required: true
            },
            deviceArea: {
                required: true,
                maxlength: 40
            }
        },
        message: {
            deviceName: {
                maxlength: '输入内容过长'
            },
            deviceModel :{
                required: '请选择设备型号'
            },
            deviceArea: {
                maxlength: '输入内容过长'
            }
        }
    });

    $('#modifyDevice').validate({
        rules: {
            deviceName: {
                required: true,
                maxlength: 40
            },
            deviceModel :{
                required: true
            },
            deviceDp: {
                required: true,
                maxlength: 40
            }
        },
        message: {
            deviceName: {
                maxlength: '输入内容过长'
            },
            deviceModel :{
                required: '请选择设备型号'
            },
            deviceDp: {
                maxlength: '输入内容过长'
            }
        }
    });

    $('#setWarn').validate({
        rules: {
            topValue: {
                isTemperature: true
            },
            botValue: {
                isTemperature: true
            }
        }
    });

    $('#setTempInfo').validate({
        rules: {
            tempValue: {
                required: true,
                setTemperature: true
            }
        }
    });

});
