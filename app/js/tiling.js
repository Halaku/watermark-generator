var Tiling = (function(){

    var init = function(){
        _setUpListners();
    };

    var _setUpListners = function(){
    	$('.mode__tile').on('click', _tiling);
    }
    var _tiling = function(){
			var $this = $(this),
					inputX = $('#coords-x'),
					inputY = $('#coords-y'),
					img = $('.processed_img'),
					wm = $('.processed_wm'),
					imgWidth,
					imgHeight,
					wmWidth,
					wmHeight,
					clone = null,
					tiling = $('.tiling'),
					mapItem = $('.map__item'),
					gutterLeft = 0,
					gutterBottom = 0,
					l = 0;

			imgWidth = img.width(),
			imgHeight = img.height();
			wmWidth = wm.width(),
			wmHeight = wm.height();

			$(mapItem).removeClass('map__item_active');
			$('.map__tiling').show();
			$('.mode__single').removeClass('mode__single_active');
			$this.addClass('mode__tile_active');

			var countWidth = Math.ceil(imgWidth / wmWidth);
			var countHeight = Math.ceil(imgHeight / wmHeight);

			tiling.css({'min-width': countWidth * (wmWidth + gutterLeft),
									'min-height': countHeight * (wmHeight + gutterBottom)});

			for (var i = 0, l = countHeight * countWidth; i<l; i++){
				clone = wm.clone();
				clone.css({
					position: 'relative',
					float: 'left',
					'margin-left': gutterLeft,
					'margin-bottom': gutterBottom
				});
				tiling.append(clone);
			}

			tiling.draggable({
				cursor: 'move',
			});

			var spinnerX = inputX.spinner();

				spinnerX.on('spin', function(e, ui){
					spinnerX = inputX.spinner({
						min: 0,
						max: imgWidth - wmWidth*2
					});

					var currentVal = ui.value;
					for(var i = 0; i < countHeight * countWidth; i++){
						var wm = $('.processed_wm');
						$(wm[i]).css({
							'margin-left': currentVal + 'px'
						});
					}

					$('.map__margin_left').css({'width': currentVal/((imgWidth - (wmWidth*2))/102) + 'px'});
			});

			var spinnerY = inputY.spinner();

			spinnerY.on('spin', function(e, ui){
				spinnerY = inputY.spinner({
					min: 0,
					max: imgHeight - wmHeight*2
				});

				var currentVal = ui.value;
				for(var i = 0; i < countHeight * countWidth; i++){
					var wm = $('.processed_wm');
					$(wm[i]).css({
						'margin-bottom': currentVal + 'px'
					});
				}

				$('.map__margin_bottom').css({'height': currentVal/((imgHeight - (wmHeight*2))/102) + 'px'});
			});
		};

    return{
        init: init
    };
})();

Tiling.init();
$('.mode__tile').on('click', function(){
	$(this).addClass('mode__tile_active');
	$('.mode__single').removeClass('mode__single_active');
});
