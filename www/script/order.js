/**
 * Created by Administrator on 2017/3/13 0013.
 */
$(function () {
    $('body').on('click','.toDo',function () {
        var way = $(this).html();
        var orderNumber = $(this).parent().siblings('.orderNumber').html();
        console.log(orderNumber);
        if (way=='立即支付') {
            $.cookie('orderNumber',orderNumber);
            location.replace('/pay')
        }else if(way=='确认收货'){
            var id = $(this).parents('.listDetail').attr('data-id');
            console.log(id);
            $.ajax({
                url: '/api/user/changeOrder',
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
        }else if(way=='提醒发货'){
            $.popup('提醒成功',function () {
                location.reload();
            });
        }
    })
})