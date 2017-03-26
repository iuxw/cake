$(function () {
    $('.move').mouseenter(function () {
        $('.vip-center').show();
    });
    $('.move').mouseleave(function () {
        $('.vip-center').hide();
    });
    $('.ft-01').mouseenter(function () {
        var index = $(this).index();
        $('.ft-01-t:eq(' + index + ')').stop().animate({
            bottom: "-30px"
        }, 500, function () {
            $(this).hide();
        })
        $('.ft-01-d:eq(' + index + ')').stop().animate({
            opacity: "show",
        }, 500, function () {
            $(this).show();
        })
        $('.ft-01-bg:eq(' + index + ')').stop().animate({
            top: "80px",
            opacity: 'show'
        }, 500)
    })
    $('.ft-01').mouseleave(function () {
        var index = $(this).index();
        $('.ft-01-t:eq(' + index + ')').stop().animate({
            bottom: "0px"
        }, 500, function () {
            $(this).show();
        })
        $('.ft-01-d:eq(' + index + ')').stop().animate({
            opacity: "hide",
        }, 500, function () {
            $(this).hide();
        })
        $('.ft-01-bg:eq(' + index + ')').stop().animate({
            top: "100px",
            opacity: 'hide'
        }, 500)
    })
    $('.p1').click(function () {
        $('.mask').show();
        $('.popup1:eq(0)').show();
    })
    $('.foot-login').click(function () {
        $('.mask').show();
        $('.popup1:eq(0)').show();
    })
    $('.close').click(function () {
        $('.mask').hide();
        $('.popup1').hide();
    })
    $('.login-r').click(function () {
        $('.popup1:eq(0)').hide();
        $('.popup1:eq(1)').show();
    })
    $('#p2').click(function () {
        $('.mask').show();
        $('.popup1:eq(1)').show();
    })
    $('.redd').click(function () {
        $('.popup1:eq(0)').show();
        $('.popup1:eq(1)').hide();
    });
    $('.ppt-box').click(function () {
        location.href = '/detail'
    });
//	登陆注册
    $('#login').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        var phone = $('#login input[name = phone]').val();
        $.post('/api/login',data,function (response,statusText,xhr) {
            if(statusText=='success'){
                if (response.code=='success'){
                    $.cookie("user",phone);
                    $.popup(response.message,function () {
                        location.reload();
                    });
                }else{
                    $('#login .hint').html(response.message);
                    setTimeout(function () {
                        $('#login .hint').html('');
                    },1500)
                }
            }
        })
    })
    $('#register').submit(function (e) {
        function checkPhone(){
            var phone = document.getElementById('phone').value;
            if(!(/^1[34578]\d{9}$/.test(phone))){
                alert("手机号码有误，请重填");
                return false;
            }
        }
        e.preventDefault();
        var data = $(this).serialize();
        var password = $('#register input[name = password]').val();
        var password1 = $('#register input[name = password1]').val();
        var phone = $('#register input[name = phone]').val();
        if(!(/^1[34578]\d{9}$/.test(phone))){
            $.popup('请输入正确手机号',function () {
            });
        }else if (password==password1){
            $.post('/api/register',data,function (response,statusText,xhr) {
                if(statusText=='success'){
                    if (response.code=='success'){
                        $.popup(response.message,function () {
                            location.reload();
                        });
                    }else{
                        $('#register .hint').html(response.message);
                        setTimeout(function () {
                            $('#register .hint').html('');
                        },1500)
                    }
                }
            })
        }else {
            $('#register .hint').html('两次密码不一致！请重新确认密码');
            setTimeout(function () {
                $('#register .hint').html('');
            },1500)
        }

    });
    if ($.cookie('user')){
        $('.userName:eq(0)').hide();
        $('.userName:eq(1)').show();
        $('.vip-center .login').hide();
        $('.vip-center .logout').show();
    }else {
        $('.userName:eq(0)').show();
        $('.userName:eq(1)').hide();
        $('.vip-center .login').show();
        $('.vip-center .logout').hide();
    }
    $('.vip-center').on('click','.logOut',function () {
        $.cookie('user','',{expires:-1});
        location.reload();
    });
    $('.vip-center').on('click','.myOrder',function () {
        location.href='order'
    });
    $('.vip-center').on('click','.address',function () {
        location.href='address'
    })
})