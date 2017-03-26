/**
 * Created by Administrator on 2017/3/9 0009.
 */
$(function () {
    var number = 1;
    var price = 188;
    var name = $('.cakeName').html();
    var index = 1;
    var size = '1.0磅';
    $('.dt-sel').on('click', '.sel-li', function () {
        $(this).addClass('hover').siblings().removeClass('hover');
        index = $(this).index() + 1;
        switch (index) {
            case 1:
                price = 188;
                size = '1.0磅';
                break;
            case 2:
                price = 288;
                size = '2.0磅';
                break;
            case 3:
                price = 388;
                size = '3.0磅';
                break;
            case 4:
                price = 488;
                size = '5.0磅';
                break;
        }
        $('#total').html(number * price)
    });
    $('#tab-number').on('click', '.min', function () {
        number = $(this).siblings('.text').val();
        number > 0 ? number-- : number = 0;
        $(this).siblings('.text').val(number);
        $('#total').html(number * price)
    });
    $('#tab-number').on('click', '.add', function () {
        number = $(this).siblings('.text').val();
        number++;
        $(this).siblings('.text').val(number);
        $('#total').html(number * price)
    });
    $('#tab-number').on('keyup', '.text', function () {
        number = $(this).val();
        $('#total').html(number * price);
    });
    //加入购物车
    $('.add-shop').click(function () {
        $.ajax({
            url: '/api/cart',
            type: 'POST',
            data: {name: name, size: size, number: number, price: price},
            success: function (res, status, xhr) {
                if(res.code=="success"){
                    $.popup(res.message,function () {
                        location.reload();
                    });
                }else{
                    $.popup(res.message,function () {
                    });
                }
            },
            error: function () {

            }
        })
    })
    //立即购买
    $('.now-buy').click(function () {
        var orderNumber = new Date().getTime();
        if ($.cookie('user')) {
            $.cookie('orderNumber',orderNumber);
            $.ajax({
                url: '/api/order',
                type: 'POST',
                data: {name: name, size: size, number: number, price: price,orderNumber:orderNumber},
                success: function (res, status, xhr) {
                    if(res.code=="success"){
                        $.popup(res.message,function () {
                            location.href='/pay';
                        });
                    }else if(res.code=='base'){
                        $.popup(res.message,function () {
                            location.href='/address';
                        });
                    }else {
                        $.popup(res.message,function () {
                            location.reload();
                        });
                    }
                }
            })
        }else {
            $.popup('请先登录',function () {
                location.reload();
            });
        }
    })
});