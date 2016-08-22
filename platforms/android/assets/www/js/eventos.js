$(document).on("pagecreate", "#eventos", function() {
	var value = window.localStorage.getItem("session");
	var fechaeventos = window.localStorage.getItem("fechacalendario");
	var url = urlws + "?m=obtener_eventos&i=" + value + "&f=" + fechaeventos;
	$.ajax({
		url: url,
        beforeSend : function(){
            $('#loading').fadeIn('fast');
        },
        complete : function (){
            $('#loading').fadeOut('fast');
        },
		success: function(result) {
			$('#listaeventos').html('');
			var output = "";
			$.each(result, function() {
				output += '<li><a href="#" class="evento" rel="' + this.id + '" reltitulo="'+this.titulo+'" reltipo="'+this.tipo+'"><img src="img/' + this.tipo + '.png"> <span>' + this.titulo + '</span></a></li>';
			});
			$('#listaeventos').html(output).listview('refresh');
		}
	})
	$('#cerrarformulario').click(function(e){
    	e.preventDefault();
    	$('#contformagregarevento').fadeOut('fast');
    });
    $('#botonagregarevento').click(function(e){
    	e.preventDefault();
        $('#eliminarevento').hide();
        $('#eliminarevento').parent().hide();
        $('#esmodificarevento').val('');
        $('#tituloevento').val('');
        var myselect = $("select#tipoevento");
        myselect[0].selectedIndex =0;
        myselect.selectmenu("refresh");
        $("#tipoevento option").prop("selected", false);
    	$('#contformagregarevento').fadeIn('fast');
    });
    $(document).on("click", ".evento", function(e) { 
    	e.preventDefault();
        $('#eliminarevento').show();
        $('#eliminarevento').parent().show();
        $('#esmodificarevento').val('1');
        $('#tituloevento').val($(this).attr('reltitulo'));
        $("#tipoevento").val($(this).attr('reltipo')).change();
        $('#ideventomodificar').val($(this).attr('rel'));
        $('#contformagregarevento').fadeIn('fast');
    });
    $('#eliminarevento').click(function(e){
        e.preventDefault();
        idevento = $('#ideventomodificar').val();
        var url = urlws + "?m=eliminarevento&i=" +idevento;
        var confirmar = confirm("¿Seguro de eliminar?");
        if(confirmar){
            $.ajax({
                url : url,
                beforeSend : function(){
                    $('#loading').fadeIn('fast');
                },
                complete : function (){
                    $('#loading').fadeOut('fast');
                },
                success : function(){
                    // Actualizar lista
                        var url = urlws + "?m=obtener_eventos&i=" + value + "&f=" + fechaeventos;
                        $.ajax({
                            url: url,
                            success: function(result) {
                                $('#listaeventos').html('');
                                var output = "";
                                $.each(result, function() {
                                    output += '<li><a href="#" class="evento" rel="' + this.id + '" reltitulo="'+this.titulo+'" reltipo="'+this.tipo+'"><img src="img/' + this.tipo + '.png"> <span>' + this.titulo + '</span></a></li>';
                                });
                                $('#listaeventos').html(output).listview('refresh');;
                            }
                        });
                        $('#contformagregarevento').fadeOut('fast');
                }
            });
        }
    });
    $('#guardarevento').click(function(e){
        e.preventDefault();
        if($('#esmodificarevento').val()=="1"){
            //modificar evento
            idevento = $('#ideventomodificar').val();
            id_usuario = value;
            tituloevento = $('#tituloevento').val();
            tipoevento = $('#tipoevento').val();
            fechaevento = fechaeventos;
            url = urlws + "?m=modificarevento&i=" + id_usuario + "&t=" + tituloevento + "&ti=" + tipoevento + "&f=" + fechaevento+"&id_evento="+idevento;
            $.ajax({
                url : url,
                beforeSend : function(){
                    $('#loading').fadeIn('fast');
                },
                complete : function (){
                    $('#loading').fadeOut('fast');
                },
                success : function(data){
                    // Actualizar lista
                    var url = urlws + "?m=obtener_eventos&i=" + value + "&f=" + fechaeventos;
                    $.ajax({
                        url: url,
                        success: function(result) {
                            $('#listaeventos').html('');
                            var output = "";
                            $.each(result, function() {
                                output += '<li><a href="#" class="evento" rel="' + this.id + '" reltitulo="'+this.titulo+'" reltipo="'+this.tipo+'"><img src="img/' + this.tipo + '.png"> <span>' + this.titulo + '</span></a></li>';
                            });
                            $('#listaeventos').html(output).listview('refresh');;
                        }
                    });
                    $('#contformagregarevento').fadeOut('fast');
                }
            });
        }else{
            //agregar evento
            idevento = $('#ideventomodificar').val();
            id_usuario = value;
            tituloevento = $('#tituloevento').val();
            tipoevento = $('#tipoevento').val();
            fechaevento = fechaeventos;
            url = urlws + "?m=agregarevento&i=" + id_usuario + "&t=" + tituloevento + "&ti=" + tipoevento + "&f=" + fechaevento;
            $.ajax({
                url : url,
                beforeSend : function(){
                    $('#loading').fadeIn('fast');
                },
                complete : function (){
                    $('#loading').fadeOut('fast');
                },
                success : function(data){
                    // Actualizar lista
                    var url = urlws + "?m=obtener_eventos&i=" + value + "&f=" + fechaeventos;
                    $.ajax({
                        url: url,
                        success: function(result) {
                            $('#listaeventos').html('');
                            var output = "";
                            $.each(result, function() {
                                output += '<li><a href="#" class="evento" rel="' + this.id + '" reltitulo="'+this.titulo+'" reltipo="'+this.tipo+'"><img src="img/' + this.tipo + '.png"> <span>' + this.titulo + '</span></a></li>';
                            });
                            $('#listaeventos').html(output).listview('refresh');;
                        }
                    });
                    $('#contformagregarevento').fadeOut('fast');
                }
            });
        }
    });
});
