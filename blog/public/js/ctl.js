$(function(){
	$(".back2top").hide();
	$(window).scroll(function(){ 
		if($(this).scrollTop() == 0){
			$(".back2top").hide();
		}else{
			$(".back2top").show();
		}
	})
	$(".back2top").click(function(){
		$('html, body').animate({scrollTop: 0}, 800); 
		//return false; 
	})
})
