function showLoading( on, params ) {  // on: true|false
    setTimeout( function() {
      if ( on )
        $.mobile.loading( "show", params );
      else {
        //$.mobile.loading( "hide" );  // does not seem to work (e.g. using with GWT and jQM 1.4.3)
        $('.ui-loader').remove();  // removes the loader div from the body
      }       
    }, 1);
}
var urlwordpress = "https://www.dondeir.com/api/";
$( document ).on( "pageinit", "#iniciarsesion", function( event ) {
});
$( document ).on( "pageinit", "#noticias", function( event ) {
	showLoading( true ); 
	$.ajax({
		url : urlwordpress+'get_recent_posts/?page=1',
		success : function (data){
			data = data.posts;
			 $.each(data, function(i, item) {
			 	titulo = item.title;
			 	extracto = item.excerpt;
			 	imagen = item.attachments[0].url;
			 	id = item.id;
			 	url = item.url;
			 	output = '<div class="noticia"><div class="imgnoticia"><a class="mostrarnota" rel="'+id+'"><img src="'+imagen+'" alt="Noticia"></a></div><div class="previonoticia"><h2><a class="mostrarnota" rel="'+id+'">'+titulo+'</a></h2><br><div class="extractonoticia">'+extracto+'</div></div><div class="clear"></div></div>'
				$('#contenedornoticias').append(output);
				showLoading( false ); 
			});
		}
	});
	$(document).on("click", ".mostrarnota", function() {
		var id_post = $(this).attr('rel');
		alert(id_post);
		$.ajax({
			url : urlwordpress+'get_post/?id='+id_post,
			success : function(data){
				titulo = data.post.title_plain;
				imagen = data.post.attachments[0].url;
				contenido = data.post.content;
			 	$('#contenidonoticia').html('<h1>'+titulo+'</h1><div class="imageninterior"><img class="portadainterior" src="'+imagen+'"/></div><div class="contenidointerior">'+contenido+'</dv>');
				$('#contenidonoticia').fadeIn('fast');
			}
		});
	});
});