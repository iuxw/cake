/**
 * Created by Administrator on 2017/3/16 0016.
 */
$(function () {
    $('#order-manage').click(function () {
        $('#orderManage').show();
        $('#adminManage').hide();
    });
    $('#admin-manage').click(function () {

        $('#orderManage').hide();
        $('#adminManage').show();
    })
    $('.changePassword').submit(function (e) {
        e.preventDefault();
        var password=$('input[name="password"]').val();
        var password1=$('input[name="password1"]').val();
        if (password.length < 6) {
            alert('密码长度至少6位');
        } else if (password==password1){
            var data = $(this).serialize();
            $.ajax({
                url: '/api/admin',
                type: 'POST',
                data: data,
                success: function (res, status, xhr) {
                    if (res.code == 'success') {
                        alert(res.message);
                        location.reload();
                    }else {
                        alert(res.message);
                    }
                }
            })
        }else {
            alert('两次输入密码不一致')
        }

    })
    $('.logout').click(function () {
        $.cookie('admin',{extend:-1});
        location.href='/adminLogin';
    });
})