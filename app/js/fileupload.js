(function () {

	var publicData,
		file = {},
		options = {
			autoUpload: false,
			dataType: 'json',
			add: add
		},
		abs = Math.abs,
		watermark = $('.processed_wm'),
		source = $('.processed_img'),
		container = $('.preview__window'),
		formats = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

	init();
	publicInterface();

	function init() {
		$('#files-form').fileupload(options);
	}

	function add(e, data) {
		if (data.files && data.files[0]) {
			var id = data.fileInput[0].id,
				value = data.fileInput[0].files[0].name,
				type = data.files[0].type;
				input = $('#'+id),
				reader = new FileReader(),
				submit = $('#files-upload');

			if (formatValidation(type)) {
				input.siblings('.input__file-name').val(value);

				reader.onload = function (e) {
					if (id == 'source') {
						if (!file.source) {
							file.source = {};
						}
						file.source.path = e.target.result;
						display(file.source, id);
						resizeWatermark();
						file.source.size = sizesCalc(file.source, id);
						file.scale = scaleCalc();
					} else if (id == 'watermark') {
						if (!file.watermark) {
							file.watermark = {};
						}
						file.watermark.path = e.target.result;
						display(file.watermark, id);
						resizeWatermark();
						file.watermark.size = sizesCalc(file.watermark, id);
						file.scale = scaleCalc();
					}
				}

				reader.readAsDataURL(data.files[0]);
			} else {
				alert('К сожалению, наш сервис поддерживает только следующие форматы: '+formats.join(', ')+'.');
			}
		}
	}

	function display(file, type) {
		if (type == 'source') {
			source.attr('src', file.path);
		} else if (type == 'watermark') {
			watermark.attr('src', file.path);
		}
		resetWatermarkCoords();
		slider.init();
	}

	function resetWatermarkCoords() {
			watermark.css({
				'left': 0,
				'top': 0
			});
	}

	function resizeWatermark() {
		if (file.watermark) {
			watermark.css({
				'width': 'auto',
				'height': 'auto'
			});
			var imgScale = +file.source.size.scale,
				widthScale = watermark.width() / imgScale,
				heightScale = watermark.height() / imgScale,
				widthDif =  source.width() - widthScale,
				heightDif = source.height() - heightScale;


			if (widthDif < 0 || heightDif < 0) {
				if ((abs(widthDif) > abs(heightDif) && widthDif < 0) || (heightDif >= 0 && widthDif < 0)) {
					watermark.css('width', source.css('width'));
				} else {
					watermark.css('height', source.css('height'));
				}
			} else {
				watermark.css({
					'height' : heightScale,
					'width' : widthScale
				});
			}
		}
	}

	function sizesCalc(pic, id) {
		$('body').append('<img src="'+pic.path+'" id="img-size-helper">');
		var img = $('#img-size-helper'),
			size = {},
			widthScale,
			heightScale;
		size.startSize = {
				width: img.width(),
				height: img.height()
			};
		if (id == 'source') {
			size.resultSize = {
					width: $('.processed_img').width(),
					height: $('.processed_img').height()
				};
		}	else if (id == 'watermark') {
			size.resultSize = {
				width: $('.processed_wm').width(),
				height: $('.processed_wm').height()
			};
		}
		img.remove();
		widthScale = size.startSize['width'] / size.resultSize['width'];
		heightScale = size.startSize['height'] / size.resultSize['height'];
		size.scale = widthScale > heightScale ? widthScale : heightScale;
		return size;
	}

	function scaleCalc() {
		if (file.source && file.watermark) {
			var scale = file.source.size.scale / file.watermark.size.scale;
		}
		return scale;
	}

	function formatValidation(fileType) {
		for (var format in formats) {
			if (fileType == 'image/'+formats[format]) {
				return true;
			}
		}
		return false;
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
			getScale: function () {
				if (file.source.size.scale && file.watermark.size.scale) {
					return file.source.size.scale / file.watermark.size.scale;
				}
			}
		}
	}


	window.fileupload = publicData;
})();