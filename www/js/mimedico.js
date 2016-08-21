$(document).on("pagecreate", "#mimedico", function() {
	//alert('mimedico');
	var value = window.localStorage.getItem("session");
	$.ajax({
	        url: urlws + '?m=obtener_medico&i=' + value,
	        success: function(result) {
	        	if(result!=null){
	        		//console.log(result.id);
	        		$('#nombre').val(result.nombre);
		            $('#correo').val(result.correo);
		            $('#nombre_medico').val(result.nombre);
		            $('#correo_medico').val(result.correo);
		            $('#telefono').val(result.telefono);
		            $('#botonllamar').attr('href', 'tel://' + result.telefono);
		            $('#modificarmedico').val('1');
		            $('#idmedicoregistrado').val(result.id);
	        	}else{
	        		//no hacer nada
	        	}
	            
	        },
	        beforeSend: function() {
	           showLoading( true );
	        },
	        complete: function() {
	            showLoading( false );
	        }
	    });
	/* obtener datos del usuario */
	    $.ajax({
	        url: urlws + '?m=obtener_usuario&i=' + value,
	        success: function(result2) {
	            $('#nombre_usuario').val(result2.nombre);
	            $('#correo_usuario').val(result2.correo);
	        },
	        beforeSend: function() {
	            showLoading( true );
	        },
	        complete: function() {
	            showLoading( false );
	        }
	    })
	/* guardar o modificar datos de médico */
	    $('#formmedico').submit(function(e) {
	        e.preventDefault();
	        if($('#modificarmedico').val()=="1"){
	        	url = urlws + "?m=modificar_medico&n=" + $('#nombre').val() + "&c=" + $('#correo').val() + "&t=" + $('#telefono').val() + "&i=" + value + "&id_medico="+ $('#idmedicoregistrado').val();
	        }else{
	        	url = urlws + "?m=registrar_medico&n=" + $('#nombre').val() + "&c=" + $('#correo').val() + "&t=" + $('#telefono').val() + "&i=" + value;
	        }
	        $.ajax({
	            url: url,
	            success: function(result) {
	                if (result == "success") {
	                    $('#mensajes p').val('');
	                    $('#mensajes p').html('El médico se registró exitosamente');
	                    $('#layermensaje').fadeIn('fast');
	                    $('#nombre_medico').val($('#nombre').val());
			            $('#correo_medico').val($('#correo').val());
			            $('#botonllamar').attr('href', 'tel://' + $('#telefono').val());
			            $('#modificarmedico').val('1');

	                } else {
	                    $('#mensajeregistro p').html('Hubo un error, intenta de nuevo');
	                    $('#mensajeregistro').fadeIn('fast');
	                }
	            },
	            beforeSend: function() {
	                showLoading( true );
	            },
	            complete: function() {
	                showLoading( false );
	            }
	        });
	    });
/* submit form */
	$('#botonguardarmedico').click(function(e){
		e.preventDefault();
		$('#formmedico').submit();
	});

/* enviar correo a médico */
	    $('#formcorreomedico').submit(function(e) {
	        e.preventDefault();
	        url = urlws + "?m=mail_medico&n=" + $('#nombre_usuario').val() + "&nm=" + $('#nombre_usuario').val() + "&c=" + $('#correo_usuario').val() + "&cm=" + $('#correo_medico').val() + "&mensaje=" + $('#mensaje').val();
	        $.ajax({
	            url: url,
	            success: function(result) {
	                if (result == "success") {
	                    $('#mensajes p').html('El correo se envió exitosamente');
	                    $('#layermensaje').fadeIn('fast');
	                } else {
	                    $('#mensajes p').html('Hubo un error, intenta de nuevo');
	                    $('#layermensaje').fadeIn('fast');
	                }
	            },
	            beforeSend: function() {
	                //$.mobile.loading('show');
	            },
	            complete: function() {
	                //$.mobile.loading('hide');
	            }
	        });
	    });
	   $('#botonenviarcorreo').click(function(e){
		e.preventDefault();
		$('#formcorreomedico').submit();
	});

});