$(document).on("pagecreate", "#iniciarsesion", function() {
		$('#hacerlogin').click(function(e){
			e.preventDefault();
			url = urlws + "?m=login&u=" + $('#userlogin').val() + "&p=" + $('#passwordlogin').val();
	        $.ajax({
	            url: url,
	            success: function(result) {
	                if (result != "") {
	                    //login correcto
	                    window.localStorage.setItem("session", result);
	                    var value = window.localStorage.getItem("session");
	                    $.mobile.changePage("menu.html", {
	                        transition: "flip",
	                        changeHash: false
	                    });
	                } else {
	                    $('#mensajeregistro').fadeIn('fast');
	                }
	            },
	            beforeSend : function(){
					$('#loading').fadeIn('fast');
				},
				complete : function (){
					$('#loading').fadeOut('fast');
				}
	        });
		});
	    $('#cerrarregistro').click(function(e) {
	        e.preventDefault(e);
	        $('#userlogin').val('');
	        $('#passwordlogin').val('');
	        $('#mensajeregistro').fadeOut('fast');
	    })
	});