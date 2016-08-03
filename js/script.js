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
var urlwordpress = "https://www.dondeir.com/api/get_recent_posts/?page=1";
$( document ).on( "pageinit", "#iniciarsesion", function( event ) {
});
$( document ).on( "pageinit", "#noticias", function( event ) {
	showLoading( true ); 
	$.ajax({
		url : urlwordpress,
		success : function (data){
			data = data.posts;
			console.log(data.posts)
			 $.each(data, function(i, item) {
			 	console.log(item);
			 	titulo = item.title;
			 	extracto = item.excerpt;
			 	imagen = item.attachments[0].url;
			 	output = '<div class="noticia"><div class="imgnoticia"><img src="'+imagen+'" alt="Noticia"></div><div class="previonoticia"><h2>'+titulo+'</h2><br><div class="extractonoticia">'+extracto+'</div></div><div class="clear"></div></div>'
				$('#contenedornoticias').append(output);
				showLoading( false ); 
			});
		}
	});
});