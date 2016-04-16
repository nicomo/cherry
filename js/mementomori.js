$( document ).ready(function() {
	var birth = 30529800;
	var lifetime = 2461528800;
	var now = Math.floor((new Date).getTime() / 1000);
	var secondsleft = (lifetime - (now-birth));
	var percentlived = 100 - (Math.floor((secondsleft * 100) / lifetime));
	var numyears = Math.floor(secondsleft / 31536000);
	var nummonths= Math.floor((secondsleft % 31536000) / 2628000);
	var numdays = Math.floor(((secondsleft % 31536000) % 2628000) / 86400);
	var mssg = numyears + ' years ' + nummonths + ' months ' + numdays + ' days left.';
	var gradientStop = document.getElementById('linGStop1');
	gradientStop.setAttribute('offset',percentlived);
	$('#mementoMssg').html(mssg);
}
