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

$(document).ready(function(){
	$('#cerrarmensajes').click(function(e){
		e.preventDefault();
		$('#layermensaje').fadeOut('fast');
	})
});