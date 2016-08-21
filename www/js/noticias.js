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