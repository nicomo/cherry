$( document ).ready(function() {

	// let's set the id and cookie for this page's content
	var last_part = false;
	var part_id;
	var step_id;
	var data_length;

	if ($.cookie('nicomo_marches_part_id') && $.cookie('nicomo_marches_step_id')) {
		console.log(
			'cookie part: ' + $.cookie('nicomo_marches_step_id') +
			' step: ' + $.cookie('nicomo_marches_step_id')); // => "value"
		part_id = $.cookie('nicomo_marches_part_id');
		step_id = $.cookie('nicomo_marches_step_id');
	} else {
		console.log("no cookie");
		part_id = 0
		step_id = 0;
		$.cookie('nicomo_marches_part_id', part_id, { path: '/marches', expires: 20 });		
		$.cookie('nicomo_marches_step_id', step_id, { path: '/marches', expires: 20 });
	};

	// init page content for 1st time
	src_initialize(part_id, step_id);

	function src_initialize(my_part_id, my_step_id) {
		//
		// TODO READ JSON JUST ONCE RATHER THAN EACH TIME AROUND
		//

		// read our data in json file
		$.getJSON('../static/data/marches_' + my_part_id +'.json', function(data) {
			
			data_length = data.length;

			// background image : big or small depending on viewport.
			var viewportWidth = $(window).width();
			console.log('viewportWidth: ' + viewportWidth);
			
			if (viewportWidth > 960) {
				var img_url = '../static/images/marches_img/marches_' + my_part_id + '_' + my_step_id + '_big.png';
			} else {
				var img_url = '../static/images/marches_img/marches_' + my_part_id + '_' + my_step_id + '.png';
			}
			console.log('img_url: '+ img_url);

			$('html#marches').css({
				'background': 'url("' + img_url + '") no-repeat center center fixed',
				'-webkit-background-size': 'cover',
				'-moz-background-size': 'cover',
				'-o-background-size': 'cover',
				'background-size': 'cover'
			});

			// insert name of character
			
			var marcheurs = ["Jean, Charleville",
				"João, Lisbonne",
				"Jan, Magadan",
				"Joel, Paris",
				"Jane, New York"];
			console.log('marcheur length: ' + marcheurs.length + ' / partid: ' + my_part_id);

			$('#marcheur').html(marcheurs[my_part_id]);

			// kilometer value in title
			var km = data[my_step_id].km;
			$('#km').html(km);

			// main text
			var my_txt = '<p>' + data[my_step_id].txt + '</p>';
			$('#marches_txt').html(my_txt);

			// set our maps
			var lat = data[my_step_id].LatLng.Lat;
			var lng = data[my_step_id].LatLng.Lng;
			map_initialize(lat,lng);

			// if at the end of this particular walk
			if ((part_id >= marcheurs.length -1) && (step_id >= data.length -1)) {
				// hides button
				$('#marches_next').hide();
			} else if ((part_id < marcheurs.length -1) && (step_id >= data.length -1)) {
				// change button
				$('#marches_next_icon').hide();
				$('#marches_next_marcheur').html('<p>'+marcheurs[parseInt(my_part_id)+1]+'</p>').show();
			} else {
				$('#marches_next_marcheur').hide();
				$('#marches_next_icon').show();
			}
		});
	}

	// when the user clicks / touches bottom button, we run initialize again
	$("#marches_next").on('touchstart click', function(){
		if(step_id >= data_length -1) {
			step_id = 0;
			$.cookie('nicomo_marches_step_id', step_id, { path: '/marches', expires: 25 });
			++part_id;
			$.cookie('nicomo_marches_part_id', part_id, { path: '/marches', expires: 25});
		} else {
			// increment the step_id and update the cookie	
			++step_id;
			$.cookie('nicomo_marches_step_id', step_id, { path: '/marches', expires: 25 });
		}
		// update data in page
		src_initialize(part_id, step_id);
	});

	function map_initialize(lat, lng) {
        var mapCenter = new google.maps.LatLng(lat, lng);
        var mapOptions = {
          center: mapCenter,
          zoom: 15
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var panoramaOptions = {
            position: mapCenter,
            pov: {
                heading: 190,
                pitch: 10
            }
        };
        var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
        map.setStreetView(panorama);
	}


	// toggle of txt + maps to see background image
	$('#marches_header').click(function() {
		$('#txt_maps').toggle("slow", function() {
			// Animation complete
		});

		if ($('#marches_show').is(":visible")) {
			$('#marches_show').css("display","none");
			$('#marches_hide').css("display","block");
		} else {
			$('#marches_show').css("display","block");
			$('#marches_hide').css("display","none");
		};
	});

});