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
                        $.popup(res.message,function () {
                            location.reload();
                        });
                    }else {
                        $.popup(res.message,function () {

                        });
                    }
                }
            })
        }else {
            alert('两次输入密码不一致')
        }

    })
    $('.logout').click(function () {
        $.cookie('admin','',{expires:-1});
        location.reload();
    });
    $('.cartList').on('click', '.handle', function () {
        var id = $(this).parents('.listDetail').attr('data-id');
        var todo = $(this).html();
        if(todo=='发货'){
            $.ajax({
                url: '/api/admin/changeOrder',
                type: 'POST',
                data: {id},
                success: function (res, status, xhr) {
                    if (res.code == 'success') {
                        $.popup(res.message,function () {
                            location.reload();
                        });
                    }
                }
            })
        }else if (todo=='提醒收货'){
            $.popup('提醒成功',function () {
            });
        }
    });
})