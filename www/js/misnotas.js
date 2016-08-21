$(document).on("pagecreate", "#misnotas", function() {
	var value = window.localStorage.getItem("session");
	/* obtener notas */
	url = urlws + '?m=obtener_notas' + '&i=' + value;
	$.ajax({
		url: url,
		success: function(result) {
			$('#contenedordenotas').html('');
			$.each(result, function() {
				$('#contenedordenotas').append('<li><a href="#" class="nota" rel="' + this.id + '" reltitulo="'+this.titulo+'" relcontenido="'+this.contenido+'"><img src="img/nota.png"> <span>' + this.titulo +' | '+ this.fecha + '</span></a></li>').listview('refresh');
			});
		},
		beforeSend: function() {
			showLoading( true );
		},
		complete: function() {
			showLoading( false );
		}
	});
	/* cerrar formulario */
	$('#cerrarformulario').click(function(e){
		e.preventDefault();
		$('#layerformulario').fadeOut('fast');
	});
	/* fin cerrar formulario */
	/* abrir formulario */
	$('#botonagregarnota').click(function(e){
		e.preventDefault();
		$('#eliminarnota').hide();
		$('#eliminarnota').parent().hide();
		$('#editaroguardarnota').val(1);
		$('#layerformulario').fadeIn('fast');
	});
	/* fin abrir formulario */
	/* agregar nota */
	//url = urlws + '?m=agregarnota&t=' + $('#titulonota').val() + '&c=' + $('#contenidonota').val() + '&i=' + $('#id_usuario').val();
	$('#agregarnota').submit(function(e){
		e.preventDefault();
		if($('#editaroguardarnota').val()==1){
			url = urlws + '?m=agregarnota&t=' + $('#titulonota').val() + '&c=' + $('#contenidonota').val() + '&i=' + value;
			$.ajax({
				url: url,
				success: function(result) {
					if (result == "success") {
						$('#layerformulario').fadeOut('fast');
						/* actualiza list view */
						url = urlws + '?m=obtener_notas' + '&i=' + value;
						$.ajax({
							url: url,
							success: function(result) {
								$('#contenedordenotas').html('');
								$.each(result, function() {
									$('#contenedordenotas').append('<li><a href="#" class="nota" rel="' + this.id + '" reltitulo="'+this.titulo+'" relcontenido="'+this.contenido+'"><img src="img/nota.png"> <span>' + this.titulo +' | '+ this.fecha + '</span></a></li>').listview('refresh');
								});
							}
						});
						/* fin actualiza list view */
					}else{
						$('#mensajes p').html('Hubo un error, intenta de nuevo');
						$('#layermensaje').fadeIn('fast');
					}
				},
				beforeSend: function() {
					showLoading( true ); 
				},
				complete: function() {
					showLoading( false ); 
				}
			});
		}else{
			url = urlws + '?m=editarnota&t=' + $('#titulonota').val() + '&c=' + $('#contenidonota').val() + '&i=' + $('#idnota').val();
			$.ajax({
				url: url,
				success: function(result) {
					if (result == "success") {
						
						$('#layerformulario').fadeOut('fast');
						/* actualiza list view */
						url = urlws + '?m=obtener_notas' + '&i=' + value;
						$.ajax({
							url: url,
							success: function(result) {
								$('#contenedordenotas').html('');
								$.each(result, function() {
									$('#contenedordenotas').append('<li><a href="#" class="nota" rel="' + this.id + '" reltitulo="'+this.titulo+'" relcontenido="'+this.contenido+'"><img src="img/nota.png"> <span>' + this.titulo +' | '+ this.fecha + '</span></a></li>').listview('refresh');
								});
							}
						});
						/* fin actualiza list view */
					}else{
						$('#mensajes p').html('Hubo un error, intenta de nuevo');
						$('#layermensaje').fadeIn('fast');
					}
				},
				beforeSend: function() {
					showLoading( true ); 
				},
				complete: function() {
					showLoading( false ); 
				}
			});
		}
	});
	/* borrar notas */
	$(document).on("click", "#eliminarnota", function() { 
		var url = urlws + '?m=eliminarnota&i=' + $(this).attr('rel');
		var confirmar = confirm("¿Seguro de eliminar?");
		if (confirmar) {
		    $.ajax({
				url : url,
				success: function(){
					url = urlws + '?m=obtener_notas' + '&i=' + value;
					$.ajax({
						url: url,
						success: function(result) {
							$('#contenedordenotas').html('');
							$.each(result, function() {
								$('#contenedordenotas').append('<li><a href="#" class="nota" rel="' + this.id + '" reltitulo="'+this.titulo+'" relcontenido="'+this.contenido+'"><img src="img/nota.png"> <span>' + this.titulo +' | '+ this.fecha + '</span></a></li>').listview('refresh');
							});
						}
					});
				},
				beforeSend: function() {
					showLoading( true ); 
				},
				complete: function() {
					showLoading( false ); 
				}
			});
		}
	});
	$(document).on("click", ".nota", function(e) {
		e.preventDefault(); 
		$('#eliminarnota').show();
		$('#eliminarnota').parent().show();
		$('#editaroguardarnota').val(2);
		$('#idnota').val($(this).attr('rel'));
		$('#layerformulario').fadeIn('fast');
		$('#titulonota').val($(this).attr('reltitulo'));
		$('#contenidonota').val($(this).attr('relcontenido'));
		$('#eliminarnota').attr('rel',$(this).attr('rel'));
	});
});