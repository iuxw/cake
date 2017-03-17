/**
 * Created by Administrator on 2016/11/9.
 * copyright © Myweb
 */
$.extend({
    change:function(obj){
        var def={
            transition: '0.5s linear',
            speed: 3000
        }
        if(obj.transition=="undefined")
        {
            obj.transition=def.transition
        }
        if(obj.speed=='undefined')
        {
            obj.speed=def.speed
        }
        var i = 1;
        var stop;
        var length = $('.ppt-box').children().length;
        function change() {
            guodu();
            i++;
            if (i == length) {
                i = 0;
            }
        }
        $('.dot li').mouseenter(function () {
            clearInterval(stop);
            i = $('.dot li').index($(this));
            guodu();
            i++;
            if (i == length) {
                i = 0;
            }
            stop = setInterval(change, obj.speed);
        })
        function guodu(){
            $('.ppt:eq(' + i + ')').css({'opacity': 1, 'transition': obj.transition})
            $('.ppt:eq(' + i + ')').siblings().css({'opacity': 0, 'transition': obj.transition});
            $('.dot li:eq(' + i + ')').addClass('active').siblings().removeClass('active');
        }
        stop = setInterval(change, obj.speed);
    }
})