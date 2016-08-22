$( document ).on( "pagecreate", "#noticias", function( event ) {
	page = 0;
	$(document).scroll(function () {
		var pagina = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		if(pagina == 'noticias'){
		    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
		    	page++;
		    	$.ajax({
					url : urlwordpress+'get_recent_posts/?page='+page,
					success : function (data){
						data = data.posts;
						 $.each(data, function(i, item) {
						 	titulo = item.title;
						 	extracto = item.excerpt;
						 	id = item.id;
						 	url = item.url;
						 	if(item.attachments.length>0){
						 		imagen = item.attachments[0].url;
						 		output = '<div class="noticia"><div class="imgnoticia"><a href="single.html?id='+id+'" class="mostrarnota" rel="'+id+'"><img src="'+imagen+'" alt="Noticia"></a></div><div class="previonoticia"><h2><a href="single.html?id='+id+'" class="mostrarnota" rel="'+id+'">'+titulo+'</a></h2><br></div><div class="clear"></div></div>'
						 	}else{
						 		output = '<div class="noticia"><div class="previonoticia"><h2><a href="single.html?id='+id+'" class="mostrarnota" rel="'+id+'">'+titulo+'</a></h2><br></div><div class="clear"></div></div>'
						 	}
							$('#contenedornoticias').append(output);
						});
					}
					,
					beforeSend : function(){
						$('#loading').fadeIn('fast');
					},
					complete : function (){
						$('#loading').fadeOut('fast');
					}
				});
		    }
	    }
	});
});
