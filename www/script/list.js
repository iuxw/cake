$(function() {
	$('.loutiul>li').mouseenter(function() {
		var index = $(this).index();
		$('.loutiul>li:eq('+index+')').addClass('active').siblings().removeClass('active');
	});
	$(window).scroll(function(){
		if($(this).scrollTop()<595){
			$('.loutiul>li:eq(0)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>=595&&$(this).scrollTop()<1056){
			$('.loutiul>li:eq(1)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>=1056&&$(this).scrollTop()<1497){
			$('.loutiul>li:eq(2)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>=1497&&$(this).scrollTop()<2727){
			$('.loutiul>li:eq(3)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>2727){
			$('.loutiul>li:eq(4)').addClass('active').siblings().removeClass('active');
		}
	})
	$('.loutiul>li:eq(0)').click(function(){
      	$('html,body').animate({scrollTop: '185px'}, 800);
	})
	$('.loutiul>li:eq(1)').click(function(){
        $('html,body').animate({scrollTop: '595px'}, 800);
	})
	$('.loutiul>li:eq(2)').click(function(){
        $('html,body').animate({scrollTop: '1056px'}, 800);
	})
	$('.loutiul>li:eq(3)').click(function(){
        $('html,body').animate({scrollTop: '1497px'}, 800);
	})
	$('.loutiul>li:eq(4)').click(function(){
        $('html,body').animate({scrollTop: '2727px'}, 800);
	});
})