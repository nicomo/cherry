$( document ).ready(function() {
	$("#marches_menu_0").on('click touch', function () {
		console.log("in");
		$.cookie("nicomo_marches_part_id", 0, { path: '/marches', expires: 20 });		
		$.cookie('nicomo_marches_step_id', 0, { path: '/marches', expires: 20 });
		console.log(
			'cookie part: ' + $.cookie('nicomo_marches_step_id') +
			' step: ' + $.cookie('nicomo_marches_step_id'));
	});	
});