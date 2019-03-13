$(function(){
	var running = false;	
	function slide(dir) {		
		if (!running) {	
			running = true;
if(dir) {
							if ( $('.carousel-item:last').hasClass("active") ) {
				$('.carousel-item:first').addClass("next");				
				} else {
			$(".active").next().addClass("next");
			}
			
			setTimeout(function() { 
			$(".active").addClass("left");
			$(".next").addClass("left");
			 }, 50);
		
			setTimeout(function() { 
			$(".active").removeClass("active left"); 
			$(".next").removeClass("next left").addClass("active");
			
			}, 800);
} else {
				if ( $('.carousel-item:first').hasClass("active") ) {
				$('.carousel-item:last').addClass("prev");				
				} else {
			$(".active").prev().addClass("prev");
			}
			
			setTimeout(function() { 
			$(".active").addClass("right");
			$(".prev").addClass("right");
			 }, 50);
		
			setTimeout(function() { 
			$(".active").removeClass("active right"); 
			$(".prev").removeClass("prev right").addClass("active");
			
			}, 800);
}
setTimeout(function() { 
running = false;
}, 850);
		};
		return false;
	}				
            $(".right").click(function() {                            
				return slide(true);	
			});
			$(".left").click(function() {                            
				return slide(false);	
			});
			intID = window.setInterval(function() { slide(true); }, 8000);
});