$(function(){
	$(".back2top").hide();
	$(window).scroll(function(){ 
		if($(this).scrollTop() == 0){
			$(".back2top").hide();
		}else{
			$(".back2top").show();
		}
	})
})