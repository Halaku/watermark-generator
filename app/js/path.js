(function () {
	function include(path) {
		$('body').append('<script src="'+path+'"></script>')
	}
	include('js/main.js');
	include('js/fileupload.js');
})();