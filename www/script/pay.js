/**
 * Created by Administrator on 2017/3/13 0013.
 */
$(function () {
    $('#payOver').click(function () {
        var orderNumber = $('.orderNumber').html();
        $.ajax({
            url:'/api/payOver',
            type:'POST',
            data:{orderNumber:orderNumber},
            success:function (res,status,xhr) {
                if (res.code=='success'){
                    location.href='/'
                }
            }
        });
    })
})