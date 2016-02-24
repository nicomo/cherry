$( document ).ready(function() {

  // let's set the id and cookie for this page's content
  var part_id = document.getElementById('marche_id').value;
  var step_id;
  var data_length;
  var liste_marches = ["Charleville-Mézières", "Lisbonne", "Magadan", "Paris", "New York", "Saipan", "Manaus"];
  var liste_marcheurs = ["Jean", "João", "Jan", "Joel", "Jane", "Jaufré", "Jefferson"];

  // we use a cookie to know at which step we're at in this particular walk
  if (Cookies.get('nicomo_marches_step_id')) {
    step_id = Cookies.get('nicomo_marches_step_id');
  } else {
    step_id = 0;   
    Cookies.set('nicomo_marches_step_id', step_id, { expires: 20, path: '' });
  };
  
  console.log("liste_marcheurs - 0: " + liste_marcheurs[my_part_id]);
  // init page content for 1st time
  src_initialize(part_id, step_id);

});

function src_initialize(my_part_id, my_step_id) {

  //
  // TODO READ JSON JUST ONCE RATHER THAN EACH TIME AROUND
  //
  var json_file = '../assets/json/marches_' + my_part_id +'.json';
  console.log(json_file);
  console.log(liste_marcheurs);
  console.log(liste_marches);
  // read our data in json file
  $.getJSON(json_file, function(data) {

    data_length = data.length;
    console.log('data_length: ' + data_length);
    
    // set background image
    var img_url = '../assets/images/marches_' + my_part_id + '_' + my_step_id + '.png';

    $('#marches-content').css({
      'background': 'url("' + img_url + '") no-repeat center center fixed',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      'background-size': 'cover'
    });

    // TITLE
    // name of character
    $('#marcheur').html(liste_marcheurs[my_part_id]);
    // city
    $('#marche').html(liste_marches[my_part_id]);
    // kilometer 
    var km = data[my_step_id].km;
    $('#km').html(km);

    // TEXT
    var my_txt = '<p>' + data[my_step_id].txt + '</p>';
    $('#marches_txt').html(my_txt);

    // MAPS
    var lat = parseFloat(data[my_step_id].LatLng.Lat);
    var lng = parseFloat(data[my_step_id].LatLng.Lng);
    console.log(lat + " " + lng + " (types: " + (typeof lat) + ", " + (typeof lng) + ")");
    initMap(lat, lng);

    // NEXT
    if (my_step_id >= data.length -1) {

      // we're at the end of this walk: move on to next walk, step 0
      my_part_id++;
      Cookies.set('nicomo_marches_step_id', 0, { expires: 20, path: '' });
      // we change the text of the button and its url
      var avancer_txt = liste_marcheurs[my_part_id] + ', ' + liste_marches[my_part_id];
      console.log(avancer_txt);
      var next_url = 'http://www.nicolasmorin.com/marches/marche_' + my_part_id + '.html';
      $("#avancer").text(avancer_txt).attr('href', next_url);

    } else {
      // we stay in this walk, next step
      my_step_id++;
      console.log(my_step_id);
      Cookies.set('nicomo_marches_step_id', my_step_id, { expires: 20, path: '' });
      src_initialize(my_part_id, my_step_id);
      
    }
  });
}

// google map
function initMap(my_lat, my_lng) {
  var fenway = {lat: my_lat, lng: my_lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: fenway,
    //TODO : fix InvalidValueError: setCenter: not a LatLng or LatLngLiteral: in property lat: not a number 
    zoom: 14
  });
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);
}