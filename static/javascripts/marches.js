$( document ).ready(function() {

	// let's set the id and cookie for this page's content
	var part_id;
	var step_id;
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
		$.cookie('nicomo_marches_part_id', part_id, { expires: 20 });		
		$.cookie('nicomo_marches_step_id', step_id, { expires: 20 });
	};

	// init page content for 1st time
	src_initialize(part_id, step_id);

	function src_initialize(my_part_id, my_step_id) {
		//
		// TODO READ JSON JUST ONCE RATHER THAN EACH TIME AROUND
		//

		// read our data in json file
		$.getJSON('../static/data/marches_' + my_part_id +'.json', function(data) {
			
			// background image
			var img_url = '../static/images/marches_img/marches_' + my_part_id + '_' + my_step_id + '.png';
			console.log(img_url);
			$('html#marches').css({
				'background': 'url("' + img_url + '") no-repeat center center fixed',
				'-webkit-background-size': 'cover',
				'-moz-background-size': 'cover',
				'-o-background-size': 'cover',
				'background-size': 'cover'
			});

			// insert name of character (hardcoded, could not be bothered...)
			var marcheur;
			switch(my_part_id) {
				case 0:
					marcheur = "Jean";
					$('#marcheur').html(marcheur);
					break;
				case 1:
					marcheur = "João";
					$('#marcheur').html(marcheur);
					break;
			}

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

			// if at the end, remove the next button
			console.log("data length: " + data.length);
			if (id >= data.length -1) {
				$('#marches_next').hide();
			}
		});
	}

	// when the user clicks / touches bottom button, we run initialize again
	$("#marches_next").on('touchstart click', function(){
		// increment the step_id and update the cookie	
		++step_id;
		$.cookie('nicomo_marches_step_id', step_id, { expires: 25 });
		console.log('button step_id=' + step_id);
		console.log('cookie: ' + $.cookie('nicomo_marches_step_id')); // => "value"

		// update data in page
		src_initialize(step_id);
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

});