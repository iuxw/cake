/**
 * Created by Administrator on 2017/3/15 0015.
 */
$(function () {
    $('.clear').click(function () {
        $('.detailAddress textarea').val('');
        $('.contact input').val('');
    })
    $('#address').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url:'/api/address',
            type:'POST',
            data:data,
            success:function (res,status,xhr) {
                if (res.code=='success'){
                    $.popup(res.message,function () {
                        history.go(-1);
                    });
                }
            }
        })
    })
})