var $form = $('#formulario'),
	$titulo = $ ('#titulo'),
	$url = $('#enlace'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

if (localStorage.getItem('autosave')) 
{
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));
}

var id = setInterval(function () {
	sessionStorage.setItem('titulo',$titulo.val());
	sessionStorage.setItem('url',$url.val());
}, 1000)

function mostrarFormulario (e) {
	e.preventDefault();
	e.stopPropagation();
	$form.slideToggle();
	$list.slideToggle();
}


function agregarPost (e) {
	e.preventDefault();
	var url = $url.val(),
		titulo = $titulo.val(),
		$clone = $post.clone();

	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href',url);

	$clone.hide();

	$list.prepend($clone);

	mostrarFormulario();

	$titulo.val('');
	$url.val('');

//	$clone.fadeIn();
	
	$clone.slideDown();
}

//Eventos
//Codigo para identificar que no se activan los eventos gracias al stopPropagation
$('nav').on('click',(function(){ console.log('soy un nav y me dieron click');}));
$('nav ul').on('click',(function(){ console.log('soy un nav ul y me dieron click');}));


$button.click( mostrarFormulario );
$form.on('submit',agregarPost)
	 .find('#enlace')
	 //en el focus se coloca http:// solo si el campo esta vacio
	 .on('focus',(function(){
	 	if ( $(this).val().length == 0 ){
	 		$(this).val('http://');
	 	}
	 }))
	 //en el focus se limpia el campo solo si unicamente tiene http://
	 .on('blur',(function(){
	 	if ( $(this).val() == 'http://'){
	 		$(this).val('');
	 	}
	 }));
