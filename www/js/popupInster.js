/**
 * Created by Administrator on 2017/3/26 0026.
 */
$.extend({
    popup:function (value,callback) {
        var html = "<div class=\"popup popup\">"+"<div class=\"pop_close\">x</div>"+"<div class=\"pop_title\">提示信息</div>"+"<div class=\"pop_content\">注册成功</div>"+"<div class=\"pop_goon\">继续</div>"+"</div>"+"<div class=\"mask\"></div>";
        $('.popup').remove();
        $('.mask').remove();
        $('body').append(html);
        $('.pop_content').html(value);
        $('.popup').hide();
        $('.popup,.mask').fadeIn();
        $('body').on('click','.pop_close',function () {
            $(this).parents('.popup').fadeOut('fast',function () {
                this.remove();
            });
            $('.mask').fadeOut('fast',function () {
                if (typeof(callback)=='function'){
                    // setTimeout(callback,1000)
                    callback();
                }
                this.remove();
            });
        })
        $('body').on('click','.pop_goon',function () {
            $(this).parents('.popup').fadeOut('fast',function () {
                this.remove();
            });
            $('.mask').fadeOut('fast',function () {
                if (typeof(callback)=='function'){
                    // setTimeout(callback,1000)
                    callback();
                }
                this.remove();
            });
        })
    }
});