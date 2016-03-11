var Positioning = (function(){

	var mapList = $('.map__list'),
			mapItem = $('.map__item'),
			inputX = $('#coords-x'),
			inputY = $('#coords-y'),
			img = $('.processed_img'),
			wm = $('.processed_wm'),
			imgWidth,
			imgHeight,
			wmWidth,
			wmHeight,
			displacement;

	var init = function(){
		_sizesUpdate();
		_setUpListners();
		_coord();
		_mouseMove();
		_coordSpin();
	};

	var _setUpListners = function(){
		mapList.on('click', _sector);
	};

	var _sizesUpdate = function(){
		img.load(function() {
  		imgWidth = img.width(),
			imgHeight = img.height();
		});

		wm.load(function() {
			wmWidth = wm.width(),
			wmHeight = wm.height();
			//сброс секторов 
			$(mapItem).removeClass('map__item_active');
			$(mapItem[0]).addClass('map__item_active');
			//сброс инпутов
			inputX.val(0);
			inputY.val(0);
		});

		mapList.on('click', function(){
			//Координаты для секторов
			displacement = [
					[0, 0],
					[0, (imgWidth/2) - (wmWidth/2)],
					[0, imgWidth - wmWidth],
					[(imgHeight/2) - (wmHeight/2), 0],
					[(imgHeight/2) - (wmHeight/2), (imgWidth/2) - (wmWidth/2)],
					[(imgHeight/2) - (wmHeight/2), imgWidth - wmWidth],
					[imgHeight - wmHeight, 0],
					[imgHeight - wmHeight, (imgWidth/2) - (wmWidth/2)],
					[imgHeight - wmHeight, imgWidth - wmWidth]
			];
		});
	};

//Перемещение вотермарка с помощью секторов
	var _sector = function(e){
		$(mapItem).removeClass('map__item_active');
			for(var i=0; i<mapItem.length; i++){
				if(e.target == mapItem[i]){
					wm.css({'top': displacement[i][0],
									'left':displacement[i][1]});
					inputX.val(displacement[i][1]);
					inputY.val(displacement[i][0]);
					$(mapItem[i]).addClass('map__item_active');
				}
			}
	};

//Перемещение вотермарка с помощью инпутов
	var _coord = function(){
		document.getElementById('coords-x').oninput = function(e){
			var x = this.value;
			if(x>=0 && x<=(imgWidth-wmWidth) && !isNaN(parseFloat(x)) && isFinite(x)){
				wm.css({'left': x +'px'});
			}
		};
		document.getElementById('coords-y').oninput = function(e){
			var y = this.value;
			if(y>=0 && y<=(imgHeight-wmHeight) && !isNaN(parseFloat(y)) && isFinite(y)){
				wm.css({'top': y +'px'});
			}
		};
	};

//Перемещение вотермарка с помощью мыши
	var _mouseMove = function(){
		$('#draggable').draggable({
			cursor: 'move',
			drag: function(){
				inputX.val($(this).position().left);
				inputY.val($(this).position().top);
			},
			containment: '.preview__window-img'
		});
	};

//Перемещение вотермарка спиннерами
	var _coordSpin = function(){
		var maxWidth = imgWidth-wmWidth;
		var spinnerX = inputX.spinner();
		spinnerX.on('spin', function(e, ui){
			spinnerX = inputX.spinner({
				min: 0,
				max: imgWidth-wmWidth
			});
			var currentVal = ui.value;
			wm.css({
				left: currentVal + 'px'
			});
		});

		var spinnerY = inputY.spinner();
		spinnerY.on('spin', function(e, ui){
			spinnerY = inputY.spinner({
				min: 0,
				max: imgHeight-wmHeight
			});
			var currentVal = ui.value;
			wm.css({
				top: currentVal + 'px'
			});
		});
	};

    return{
      init: init
    };
})();

Positioning.init();
