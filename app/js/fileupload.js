(function () {

	var file = {
			source: {},
			watermark: {}
		},
		options = {
			autoUpload: false,
			dataType: 'json',
			add: add
		};

	init();

	function init() {
		$('#files-form').fileupload(options);
	}

	function add(e, data) {
		if (data.files && data.files[0]) {
			var id = data.fileInput[0].id,
				value = data.fileInput[0].files[0].name,
				input = $('#'+id),
				reader = new FileReader(),
				submit = $('#files-upload');

			input.siblings('.input__file-name').val(value);

			reader.onload = function (e) {
				if (id == 'source') {
					file.source.path = e.target.result;
				} else if (id == 'watermark') {
					file.watermark.path = e.target.result;
				}
			}

			reader.readAsDataURL(data.files[0]);

			submit.click(function () {
				data.submit();
			});
		}
	}

	function success(e, data) {

	}

	window.fileupload = file;
})();