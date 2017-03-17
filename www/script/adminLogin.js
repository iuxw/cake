/**
 * Created by Administrator on 2017/3/17 0017.
 */
$(function () {
    $('#admin-login').submit(function (e) {
        e.preventDefault();
        var adminName=$('input[name="adminName"]').val()
        $.ajax({
            url:'/api/admin/login',
            type:'POST',
            data:$(this).serialize(),
            success:function (res,status,xhr) {
                if(res.code=='success'){
                    alert(res.message);
                    $.cookie("admin",adminName);
                    location.replace('/admin');
                }else {
                    alert(res.message);
                }
            }
        })
    })
})