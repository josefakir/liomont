$(document).on("pagecreate", "#misnotas", function() {
	var value = window.localStorage.getItem("session");
	/* obtener notas */
	url = urlws + '?m=obtener_notas' + '&i=' + value;
	$.ajax({
		url: url,
		success: function(result) {
			$('#contenedordenotas').html('');
			$.each(result, function() {
				$('#contenedordenotas').append('<li><div class="titulo_nota">' + this.titulo + '</div><div class="fecha_nota">' + this.fecha + '</div><div class="contenidonota">'+this.contenido+'</div><div class="editar_nota"><a href="#" class="en" rel="' + this.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>').listview('refresh');
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
						$('#mensajes p').html('Nota creada correctamente');
						$('#layermensaje').fadeIn('fast');
						$('#layerformulario').fadeOut('fast');
						/* actualiza list view */
						url = urlws + '?m=obtener_notas' + '&i=' + value;
						$.ajax({
							url: url,
							success: function(result) {
								$('#contenedordenotas').html('');
								$.each(result, function() {
									$('#contenedordenotas').append('<li><div class="titulo_nota">' + this.titulo + '</div><div class="fecha_nota">' + this.fecha + '</div><div class="contenidonota">'+this.contenido+'</div><div class="editar_nota"><a href="#" class="en" rel="' + this.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>').listview('refresh');
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
						$('#mensajes p').html('Nota actualizada correctamente');
						$('#layermensaje').fadeIn('fast');
						$('#layerformulario').fadeOut('fast');
						/* actualiza list view */
						url = urlws + '?m=obtener_notas' + '&i=' + value;
						$.ajax({
							url: url,
							success: function(result) {
								$('#contenedordenotas').html('');
								$.each(result, function() {
									$('#contenedordenotas').append('<li><div class="titulo_nota">' + this.titulo + '</div><div class="fecha_nota">' + this.fecha + '</div><div class="contenidonota">'+this.contenido+'</div><div class="editar_nota"><a href="#" class="en" rel="' + this.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>').listview('refresh');
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
	$(document).on("click", ".bn", function() { 
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
								$('#contenedordenotas').append('<li><div class="titulo_nota">' + this.titulo + '</div><div class="fecha_nota">' + this.fecha + '</div><div class="contenidonota">'+this.contenido+'</div><div class="editar_nota"><a href="#" class="en" rel="' + this.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>').listview('refresh');
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
	$(document).on("click", ".en", function() { 
		$('#editaroguardarnota').val(2);
		$('#idnota').val($(this).attr('rel'));
		$('#layerformulario').fadeIn('fast');
		$('#titulonota').val($(this).parent().parent().find('.titulo_nota').html());
		$('#contenidonota').val($(this).parent().parent().find('.contenidonota').html());

	});
});