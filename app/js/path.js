(function(){
	function include(url) {
		var script = document.createElement('script');
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	include("js/positioning.js");
	include("js/main.js");
})();