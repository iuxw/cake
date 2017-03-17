/**
 * Created by Administrator on 2017/3/13 0013.
 */
$(function () {
    $('body').on('click','.toDo',function () {
        var way = $(this).html();
        var orderNumber = $(this).siblings('.orderNumber').html();
        if (way=='立即支付') {
            $.cookie('orderNumber',orderNumber);
            location.replace('/pay')
        }
    })
})