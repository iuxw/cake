/**
 * Created by Administrator on 2017/3/11 0011.
 */
$(function () {
    $('.main').on('click', '.delLi', function () {
        var id = $(this).parent('.listDetail').attr('data-id');
        $.ajax({
            url: '/api/del',
            type: 'POST',
            data: {id},
            success: function (res, status, xhr) {
                if (res.code == 'success') {
                    location.reload();
                }
            }
        })
    }).on('click', '.nowShop', function () {
        var name = $('#name').html();
        var price = $('#price').html();
        var number = $('#number').html();
        var size = $('#size').html();
        var orderNumber = new Date().getTime();
        var id = $(this).parent('.listDetail').attr('data-id');
        $.cookie('orderNumber', orderNumber);
        $.ajax({
            url: '/api/order',
            type: 'POST',
            data: {name: name, size: size, number: number, price: price, orderNumber: orderNumber},
            success: function (res, status, xhr) {
                if (res.code == "success") {
                    $.ajax({
                        url: '/api/del',
                        type: 'POST',
                        data: {id},
                        success: function () {
                            $.popup(res.message,function () {
                                location.replace('/pay')
                            });
                        }
                    })
                } else if(res.code=='base'){
                    $.popup(res.message,function () {
                        location.href='address'
                    });
                }else {
                    $.popup(res.message,function () {
                        location.reload();
                    });
                }
            }

        });
    })
})