var urlwordpress = "http://graphicsandcode.com/liomontcms/api/";
//var urlwordpress = "https://dondeir.com/api/";
var urlws = "http://graphicsandcode.com/liomont/";
$(document).ready(function(){
	$('#cerrarmensajes').click(function(e){
		e.preventDefault();
		$('#layermensaje').fadeOut('fast');
	})
});
$(document).on("pagecreate", "#index", function() {
    var value = window.localStorage.getItem("session");
    if (value != null) {
            function explode(){
            $('#triggersesion').trigger( "click" );
        }
    setTimeout(explode, 500);
    //$.mobile.pushStateEnabled = false;
    //$.mobile.hashListeningEnabled = false;
    }
});