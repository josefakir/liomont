$(document).on("pagecreate", "#misnotas", function() {
	var value = window.localStorage.getItem("session");
	/* obtener notas */
	url = urlws + '?m=obtener_notas' + '&i=' + value;
	$.ajax({
		url: url,
		success: function(result) {
			$('#contenedordenotas').html('');
			$.each(result, function() {
				console.log(this);
				//$('#contenedordenotas').append('<li><div class="titulo_nota">' + this.titulo + '</div><div class="fecha_nota">' + this.fecha + '</div><div class="editar_nota"><a href="#" class="en" rel="' + this.id + '"><img src="images/editar-nota.png" alt=""></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><img src="images/eliminar-nota.png" alt=""></a></div></li>');
				$('#contenedordenotas').append('<li><li><div class="titulo_nota">' + this.titulo + '</div><div class="fecha_nota">' + this.fecha + '</div><div class="editar_nota"><a href="#" class="en" rel="' + this.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>').listview('refresh');
			});
		},
		beforeSend: function() {
			$.mobile.loading('show');
		},
		complete: function() {
			$.mobile.loading('hide');
		}
	});
});