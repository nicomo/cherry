$( document ).ready(function() {
	$("#marches_menu_0").on('click touch', function () {
		$.cookie("nicomo_marches_part_id", 0, { path: '/marches', expires: 20 });		
		$.cookie('nicomo_marches_step_id', 0, { path: '/marches', expires: 20 });
	});	
	$("#marches_menu_1").on('click touch', function () {
		$.cookie("nicomo_marches_part_id", 1, { path: '/marches', expires: 20 });		
		$.cookie('nicomo_marches_step_id', 0, { path: '/marches', expires: 20 });
	});
	$("#marches_menu_2").on('click touch', function () {
		$.cookie("nicomo_marches_part_id", 2, { path: '/marches', expires: 20 });		
		$.cookie('nicomo_marches_step_id', 0, { path: '/marches', expires: 20 });
	});
	$("#marches_menu_3").on('click touch', function () {
		$.cookie("nicomo_marches_part_id", 3, { path: '/marches', expires: 20 });		
		$.cookie('nicomo_marches_step_id', 0, { path: '/marches', expires: 20 });
	});	
});