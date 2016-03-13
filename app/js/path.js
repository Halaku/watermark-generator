(function () {
	function include(path) {
		$('body').append('<script src="'+path+'"></script>');
	}
	include('js/jquery.js');
	include('js/jquery-ui.js');
	include('js/vendor/jquery.fileupload.js');
	include('js/block.js');
	include('js/fileupload.js');
	include('js/positioning.js');
	include('js/wmOpacity.js');
	include('js/reset.js');
	include('js/language.js');
	include('js/wmScale.js');

})();

