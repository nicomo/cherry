function showdetails(detailid) {
	$('.about-detail').each(function(index){
		if ($(this).attr("id") === detailid) {
			$(this).show(200)
		} else {
			$(this).hide(400)
		}
	});
}