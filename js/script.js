var urlwordpress = "https://www.dondeir.com/api/";
var urlws = "http://graphicsandcode.com/liomont/";
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
$( document ).on( "pagecreate", "#iniciarsesion", function( event ) {
});
$( document ).on( "pagecreate", "#noticias", function( event ) {
	showLoading( true ); 
	$.ajax({
		url : urlwordpress+'get_recent_posts/?page=1',
		success : function (data){
			data = data.posts;
			 $.each(data, function(i, item) {
			 	titulo = item.title;
			 	extracto = item.excerpt;
			 	id = item.id;
			 	url = item.url;
			 	if(item.attachments.length>0){
			 		imagen = item.attachments[0].url;
			 		output = '<div class="noticia"><div class="imgnoticia"><a href="single.html?id='+id+'" class="mostrarnota" rel="'+id+'"><img src="'+imagen+'" alt="Noticia"></a></div><div class="previonoticia"><h2><a href="single.html?id='+id+'" class="mostrarnota" rel="'+id+'">'+titulo+'</a></h2><br><div class="extractonoticia">'+extracto+'</div></div><div class="clear"></div></div>'
			 	}else{
			 		output = '<div class="noticia"><div class="previonoticia"><h2><a href="single.html?id='+id+'" class="mostrarnota" rel="'+id+'">'+titulo+'</a></h2><br><div class="extractonoticia">'+extracto+'</div></div><div class="clear"></div></div>'
			 	}
				$('#contenedornoticias').append(output);
				showLoading( false ); 
			});
		}
	});
});
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

