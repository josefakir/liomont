$(document).on("pagecreate", "#alarmas", function() {
	var value = window.localStorage.getItem("session");
	moment.locale('es-mx');
	url = urlws + '?m=obtener_alarmas&i=' + value;
	$.ajax({
		url : url,
		beforeSend : function(){

		},
		success : function(data){
			var output = "";
			$.each(data, function() {
				output += '<li><a href="#" class="alarma" rel="'+this.id+'"><img src="img/Otros.png"> <span>'+this.titulo+' | '+this.fecha+'</span></a></li>';
			});
			$('#listaalarmas').html(output).listview('refresh');
		}
	});
	$('#botonagregaralarma').click(function(e){
		e.preventDefault();
		$('#formagregaralarma').show();
		$('#formeliminaralarma').hide();
		$('#layerformulario').fadeIn('fast');
	});
	$('#cerrarformulario').click(function(e){
    	e.preventDefault();
    	$('#layerformulario').fadeOut('fast');
    });
    $('#cerrarformulario2').click(function(e){
    	e.preventDefault();
    	$('#layerformulario').fadeOut('fast');
    });
    $( "#relojalarma" ).timeDropper({
    	format : 'HH:mm:00'
    });
    $('#repetir').switchable();
    var today = new Date();
    $('#dia').val(today.getDate());
    $('#mes').val( today.getMonth());
    $('#anio').val(today.getFullYear());
    var micalendario = $('#widgetcalendarioalarmas').clndr({
    	daysOfTheWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    	clickEvents: {
            click: function (target) {
            	fecha = target.date._i;
            	fecha = fecha.split("-");
            	selector = '.calendar-day-'+fecha[0]+'-'+fecha[1]+'-'+fecha[2];
            	$('.day').removeClass('diaseleccionado');
            	$(selector).addClass('diaseleccionado');
            	$('#dia').val(fecha[2]);
            	$('#mes').val(fecha[1]);
            	$('#anio').val(fecha[0]);
            },
        }
    });
    $('#guardaralarma').click(function(e){
    	e.preventDefault();
    	if($("#repetir").prop('checked')==true){
    		repetir = 1;
    	}else{
    		repetir = 0;
    	}
    	fechasql = $('#anio').val()+'-'+$('#mes').val()+'-'+$('#dia').val()+' '+$('#relojalarma').val();
    	alarma = $('#tituloalarma').val();
    	if (!alarma) {
	        alarma = 'alarma';
	    }
		url = urlws + '?m=agregaralarma&t=' + alarma + '&f=' + fechasql + '&i=' + value + "&r=" + repetir;
		$.ajax({
			url : url,
			beforeSend : function(){

			},
			success : function (data){
				id_alarma = data;
				/* agendar alarma plugin */
				anio = $('#anio').val();
				mes = $('#mes').val();
				dia = $('#dia').val();
				hora = $('#relojalarma').val();
				hora = hora.split(':');
				minutos = hora[1];
				hora = hora[0];
				fechaalarma = new Date(anio, mes, dia, hora, minutos, 0);
				agendarAlarma(id_alarma, fechaalarma, alarma, repetir);
				/* pintar nuevas */
				url = urlws + '?m=obtener_alarmas&i=' + value;
				$.ajax({
					url : url,
					beforeSend : function(){

					},
					success : function(data){
						var output = "";
						$.each(data, function() {
							output += '<li><a href="#" class="alarma" rel="'+this.id+'"><img src="img/Otros.png"> <span>'+this.titulo+' | '+this.fecha+'</span></a></li>';
						});
						$('#listaalarmas').html(output).listview('refresh');
					}
				});
				$('#layerformulario').fadeOut('fast');
			}
		});
    });
/* 	eliminar alarma */
	$(document).on("click", ".alarma", function(e) { 
		$('#formagregaralarma').hide();
		$('#formeliminaralarma').show();
		$('#layerformulario').fadeIn('fast');
		$('#informacionalarma').html($(this).html());
		$('#eliminaralarma').attr('rel',$(this).attr('rel'));
	});
	$('#eliminaralarma').click(function(e){
		e.preventDefault();
		idalarma = $(this).attr('rel');
		var confirmar = confirm("¿Seguro de eliminar?");
        if(confirmar){
        	var url = urlws + '?m=eliminaralarma&i=' + idalarma;
        	$.ajax({
        		url : url,
        		beforeSend : function(){

        		},
        		success : function(data){
        			url = urlws + '?m=obtener_alarmas&i=' + value;
					$.ajax({
						url : url,
						beforeSend : function(){

						},
						success : function(data){
							var output = "";
							$.each(data, function() {
								output += '<li><a href="#" class="alarma" rel="'+this.id+'"><img src="img/Otros.png"> <span>'+this.titulo+' | '+this.fecha+'</span></a></li>';
							});
							$('#listaalarmas').html(output).listview('refresh');
							cancelarAlarma(idalarma);
						}
					});
					$('#layerformulario').fadeOut('fast');
        		}
        	})
        }
	
	})
//
});