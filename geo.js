$(function () {
	var geo = navigator.geolocation;
	var opciones = {};

	function geo_error () {
		console.log('Hmmmmm....no e logra determinar tu ubicacion');
	}

	function geo_exito (posicion) {
		var lat = posicion.coords.latitude;
		var lon = posicion.coords.longitude;

		// console.log(lat+","+lon);
		var mapa = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?maptype=map&zoom=13&size=340x200&sensor=false&center="+lat+","+lon;
		//console.log(mapa);

		$('#geo').append(mapa);

		// Si queremos definir variable en el contexto global
		// window.lat = lat;
		// window.lon = lon;
		obtenerGeoInformacion(lat,lon);		

	}
	geo.getCurrentPosition(geo_exito,geo_error,opciones);	
});
	