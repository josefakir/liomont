$(document).on("pagecreate", "#logout", function() {
	var value = window.localStorage.getItem("session");
	localStorage.removeItem('session');
	$.mobile.changePage("index.html", {
		transition: "flip",
		changeHash: false
	});
});