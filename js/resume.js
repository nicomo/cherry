$(document).ready(function() {
	
	/* hide-show the details cards */
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
	  $('.showdetails').on("click", function() {
			detailid = $(this).attr("id")
			did = (parseInt(detailid.slice(5))) // remove "about", keeps number

			// show-hide the details card
			$('.about-detail').each(function(index){
				if ($(this).attr("id") === detailid) {
					$(this).show(400)
				} else {
					$(this).hide()
				}
			});

			// on mobile show-hide the paragraphs below detail card
			$('.resume-para').each(function(index){
				
				if (did === 1) {
					console.log("did: " + did)
					if (parseInt($(this).attr("id")) === 1) {
						$(this).show()
					} else {
						$(this).hide()
					}
				} else if (did >= 2 && did <= 5) {
					console.log("did: " + did)
					if (parseInt($(this).attr("id")) <= 2) {
						$(this).show()
					} else {
						$(this).hide()
					}
				} else if (did > 5 && did <= 8) {
					if (parseInt($(this).attr("id")) <= 4) {
						console.log("did: " + did)
						$(this).show()
					} else {
						$(this).hide()
					}
				} else if (did == 9) {
					if (parseInt($(this).attr("id")) <= 5) {
						console.log("did: " + did)
						$(this).show()
					} else {
						$(this).hide()
					}
				} else if (did == 10) {
					$(this).show()
				}
			});
		});
	}
});