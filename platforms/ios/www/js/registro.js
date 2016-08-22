$(document).on('pagecreate','#paginaregistro', function(){
  $('#registrar').click(function(e) {
	        e.preventDefault();
	        if ($('#pass1').val() != $('#pass2').val()) {
	            $('#mensajes p').html('Las contraseñas no coinciden');
	            $('#layermensaje').fadeIn('fast');
	        } else {
	            url = urlws + '?m=registro&n=' + $('#nombre').val() + '&c=' + $('#email').val() + '&e=' + $('#edad').val() + '&p=' + $('#pass1').val();
	            $.ajax({
	                url: url,
	                success: function(result) {
	                    if (result == 'success') {
	                        $('#mensajes p').html('¡Gracias por registrarte!');
	                        $('#layermensaje').fadeIn('fast');
	                    } else {
	                        $('#mensajes p').html('Hubo un error, intenta de nuevo');
	                        $('#layermensaje').fadeIn('fast');
	                    }
	                },
	                beforeSend: function() {
	                },
	                complete: function() {
	                }
	            })
	        }

	    });
});