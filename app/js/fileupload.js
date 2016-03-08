(function () {

	var publicData,
		file = {},
		options = {
			autoUpload: false,
			dataType: 'json',
			add: add
		};

	init();
	publicInterface();

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
					if (!file.source) {
						file.source = {};
					}
					file.source.path = e.target.result;
					display(file.source, id);
					file.source.size = sizesCalc(file.source, id);
				} else if (id == 'watermark') {
					if (!file.watermark) {
						file.watermark = {};
					}
					file.watermark.path = e.target.result;
					display(file.watermark, id);
					file.watermark.size = sizesCalc(file.watermark, id);
				}
			}

			reader.readAsDataURL(data.files[0]);

			submit.click(function () {
				data.submit();
			});
		}
	}

	function display(file, type) {
		if (type == 'source') {
			$('.processed_img').attr('src', file.path);
		} else if (type == 'watermark') {
			$('.processed_wm').attr('src', file.path);
		}
	}

	function sizesCalc(pic, id) {
		$('body').append('<img src="'+pic.path+'" id="img-size-helper">');
					var img = $('#img-size-helper'),
						size = {};
					size.startSize = {
							width: img.width(),
							height: img.height()
						};
					if (id == 'source')
						size.resultSize = {
								width: $('.processed_img').width(),
								height: $('.processed_img').height()
							};
					else if (id == 'watermark')
						size.resultSize = {
							width: $('.processed_wm').width(),
							height: $('.processed_wm').height()
						};
					img.remove();
					return size;
	}

	function success(e, data) {

	}

	function publicInterface() {
		publicData = {
			getSource: function () {
				if (file.source) {
					return file.source.size;
				} else {
					return false;
				}
			},
			getWatermark: function () {
				if (file.watermark) {
					return file.watermark.size;	
				} else {
					return false;
				}
			},
			getScales: function () {
				var scales = {};
				if (file.source) {
					scales.imgScale = file.source.size.startSize['width']/file.source.size.resultSize['width'];
				} else {
					scales.imgScale = false;
				}
				if (file.watermark) {
					scales.wmScale = file.watermark.size.startSize['width']/file.watermark.size.resultSize['width'];
				} else {
					scales.wmScale = false;
				}
					scales.scale = scales.imgScale / scales.wmScale;

				return scales;
			}
		}
	}


	window.fileupload = publicData;
})();