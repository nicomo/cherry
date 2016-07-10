function showdetails(detailid) {
	$('.about-detail').each(function(index){
		if ($(this).attr("id") === detailid) {
			$(this).show(400)
		} else {
			$(this).hide()
		}
	});
}