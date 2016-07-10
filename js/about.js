$(document).ready(function() {




	if (window.matchMedia("(min-width: 1024px)").matches) {
	  /* the viewport is at least 1024 pixels wide */
  	$('.showdetails').on("click", function() {
			detailid = $(this).attr("id")
			$('.about-detail').each(function(index){
				if ($(this).attr("id") === detailid) {
					$(this).show(400)
				} else {
					$(this).hide()
				}
			});
		});




	} else {
	  /* the viewport is less than 1024 pixels wide */
	  
	}
	
});
