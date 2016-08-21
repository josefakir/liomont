$( document ).on( "pageshow", "#single", function( event ) {
	idnota = window.location.search;
	idnota = idnota.split("=");
	idnota = idnota[1];
	$.ajax({
		url : urlwordpress+'get_post/?id='+idnota,
		success : function(data){
			titulo = data.post.title_plain;
			imagen = data.post.attachments[0].url;
			contenido = data.post.content;
			$('#contenidonoticia').html('<h1>'+titulo+'</h1><div class="imageninterior"><img class="portadainterior" src="'+imagen+'"/></div><div class="contenidointerior">'+contenido+'</dv>');
			showLoading( false ); 
		},
		beforeSend : function(){
			showLoading( true ); 
		}
	});
});