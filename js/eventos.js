$(document).on("pagecreate", "#eventos", function() {
	var value = window.localStorage.getItem("session");
	var fechaeventos = window.localStorage.getItem("fechacalendario");
	var url = urlws + "?m=obtener_eventos&i=" + value + "&f=" + fechaeventos;
	$.ajax({
		url: url,
		success: function(result) {
			$('#listaeventos').html('');
			var output = "";
			$.each(result, function() {
				output += '<li class="eventomes"><div class="icono_evento"><img src="img/' + this.tipo + '.png"></div><div class="texto_evento">' + this.titulo + '</div><a href="#" class="en" rel="' + this.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></div><div class="editar_nota"><a href="#" class="bn" rel="' + this.id + '"><i class="fa fa-times" aria-hidden="true"></i></a></li>';
			});
			$('#listaeventos').html(output).listview('refresh');;
		}
	})
	$('#cerrarformulario').click(function(e){
    	e.preventDefault();
    	$('#contformagregarevento').fadeOut('fast');
    });
    $('#botonagregarevento').click(function(e){
    	e.preventDefault();
    	$('#contformagregarevento').fadeIn('fast');
    });
});
