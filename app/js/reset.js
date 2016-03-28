$('.button__reset').on('click', function(e) {
	var tile = $('.mode__tile_active'),
		single = $('.mode__single_active');
	e.preventDefault();
	slider.init();
	if(tile.length > 0){
		Tiling.reset();
	} 
	if(single.length > 0){
		Positioning.reset();
	}
 // wmScaleSlider.init();
});