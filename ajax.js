$(function () {

	// Ejemplo Sencillo de Jquery para hacer una peticion AJAX
	// $.get('logos_footer.html',function (code){
	// 	// console.log(code);
	// 	$('footer').append(code);
	// });

	// El Ejemplo anterior puede reducirse a esta unica transaccion, reemplazando el contenido del elemento
	// Carga el contenido completo
	//$('#logos_footer').load('logos_footer.html');
	//
	//Carga solo la porcion de codigo identificada
	$('#logos_footer').load('logos_footer.html #platzi');

	$.get('usuarios.json',function (info) {
		// console.log (info);
		var avatar = new Image();
		avatar.src = info.avatar;
		avatar.title = info.nombre+' '+info.apellido;
		$('#avatar').append(avatar);
	});

});

var base_url = "http://query.yahooapis.com/v1/public/yql?";

//Se ejecutara luego de terminar la Geolocalizacion
function obtenerGeoInformacion (lat,lon) {
	// console.log(lat, lon);
	var query = 'select * from geo.placefinder where text="'+lat+','+ lon+'" and gflags="R"';
	
	query = encodeURIComponent(query);
	// console.log(query);
	
	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data: {
			format: 'json'
		},
	})
	/*.done(function() {
		console.log("success");
		procesarGeoInfo();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	})*/;
	
}

function procesarGeoInfo (datos) {
	// console.log('entro a procesar geoinfo');
	// console.log(datos);
	var res    = datos.query.results.Result;
	var dir    = res.line1;
	var urb    = res.neighborhood;
	var ciudad = res.city;
	var pais   = res.country;
	var woeid  = res.woeid;

	$('#geo').prepend('<p><strong>'+dir+' , '+urb+'</strong><br>'+ciudad+' , '+pais+'</p>')

	obtenerClima(woeid);
}

function obtenerClima (woeid) {
	// console.log(woeid);
	var query = 'select * from weather.forecast where woeid="'+woeid+'" and u="c"';
	
	query = encodeURIComponent(query);
	// console.log(query);
	
	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data: {
			format: 'json'
		},
	})
}

function procesarClima (datos) {
	// console.log(datos);
	var clima = datos.query.results.channel;
	var temp  = clima.item.condition.temp;
	var unit  = clima.units.temperature;
	var code  = clima.item.condition.code;
	var img   = new Image();
	img.src  = "http://l.yimg.com/a/i/us/we/52/"+code+".gif"
	// console.log(clima);
	$('#clima')
	   .append(img)
	   .append(temp+' °'+unit);
	//Variable que obtiene un html con datos de temperatura actual + forecast 
	// $('#clima').append(clima.item.description);
}