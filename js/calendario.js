$( document ).on( "pageshow", "#calendario", function() {
	var value = window.localStorage.getItem("session");
	var url2 = urlws+"?m=obtener_meses_con_evento&a="+$('#selectoranio').val()+"&mes="+$(this).attr('rel')+"&id="+value;
    $.ajax({
    	url : url2,
    	success : function(result){
    		var meses = JSON.parse( result );
    		$.each(meses, function() {
				var mes = this.mes;
				selector = "#mes"+mes;
				$(selector).append('<div class="notificacion"></div>');
			});
    	}
    });
    $('#cerrarformulario').click(function(e){
    	e.preventDefault();
    	$('#contformagregarevento').fadeOut('fast');
    });
    $('#botonagregarevento').click(function(e){
    	e.preventDefault();
    	$('#contformagregarevento').fadeIn('fast');
    });
    $('#widgetcalendario').clndr();
});