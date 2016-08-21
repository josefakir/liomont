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
/* phonegap */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        alert('Received Event: ' + id);
    }
};

$(document).ready(function(){
	$('#cerrarmensajes').click(function(e){
		e.preventDefault();
		$('#layermensaje').fadeOut('fast');
	})
});