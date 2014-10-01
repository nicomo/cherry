$( document ).ready(function() {

	// let's set the id and cookie for this page's content
	var id;
	if ($.cookie('nicomo_marches_id')) {
		console.log('cookie: ' + $.cookie('nicomo_marches_id')); // => "value"
		id = $.cookie('nicomo_marches_id');
	} else {
		console.log("no cookie");
		id = 0;
		$.cookie('nicomo_marches_id', id, { expires: 20 });
	}

	// init page content for 1st time
	src_initialize(id);

	function src_initialize(my_id) {
		//
		// TODO READ JSON JUST ONCE RATHER THAN EACH TIME AROUND
		//

		// read our data in json file
		$.getJSON('../static/data/marches_1.json', function(data) {
			
			// background image
			var img_url = '../static/images/marches_img/marches_1_' + id + '.png';
			console.log(img_url);
			$('html#marches').css("background", "url(" + img_url + ") no-repeat center center fixed");

			// kilometer value in title
			var km = data[my_id].km;
			$('#km').html(km);

			// main text
			var my_txt = '<p>' + data[my_id].txt + '</p>';
			$('#marches_txt').html(my_txt);

			// set our maps
			var lat = data[my_id].LatLng.Lat;
			var lng = data[my_id].LatLng.Lng;
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
		// increment the id and update the cookie	
		++id;
		$.cookie('nicomo_marches_id', id, { expires: 25 });
		console.log('button id=' + id);
		console.log('cookie: ' + $.cookie('nicomo_marches_id')); // => "value"

		// update data in page
		src_initialize(id);
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