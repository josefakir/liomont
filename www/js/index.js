$(document).on("pagecreate", "#index", function() {
	var value = window.localStorage.getItem("session");
	if (value != null) {
		$.mobile.loading('show');
			function explode(){
			$('#triggersesion').trigger( "click" );
		}
	setTimeout(explode, 500);
	//$.mobile.pushStateEnabled = false;
	//$.mobile.hashListeningEnabled = false;
	}
});