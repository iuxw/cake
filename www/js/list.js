$(function() {
	$('.loutiul>li').mouseenter(function() {
		var index = $(this).index();
		$('.loutiul>li:eq('+index+')').addClass('active').siblings().removeClass('active');
	});
	$(window).scroll(function(){
		if($(this).scrollTop()<520){
			$('.loutiul>li:eq(0)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>=520&&$(this).scrollTop()<1050){
			$('.loutiul>li:eq(1)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>=1050&&$(this).scrollTop()<1450){
			$('.loutiul>li:eq(2)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>=1450&&$(this).scrollTop()<2650){
			$('.loutiul>li:eq(3)').addClass('active').siblings().removeClass('active');
		}else if($(this).scrollTop()>2650){
			$('.loutiul>li:eq(4)').addClass('active').siblings().removeClass('active');
		}
	})
	$('.loutiul>li:eq(0)').click(function(){
		$(window).scrollTop(0);
	})
	$('.loutiul>li:eq(1)').click(function(){
		$(window).scrollTop(520);
	})
	$('.loutiul>li:eq(2)').click(function(){
		$(window).scrollTop(1050);
	})
	$('.loutiul>li:eq(3)').click(function(){
		$(window).scrollTop(1450);
	})
	$('.loutiul>li:eq(4)').click(function(){
		$(window).scrollTop(2650);
	})
})