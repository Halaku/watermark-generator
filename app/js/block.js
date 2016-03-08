var Block = (function(){

    var init = function(){
        _disable();
    };

	var _disable = function(){
		var inputImg = $('#source'),
				inputWm = $('#watermark');
		$(inputImg).change(function() {
			if (inputImg.val() != ''){
				$('.wm-wrap').removeClass('disable');
			}
		});
		$(inputWm).change(function() {
			if (inputWm.val() != ''){
				$('.settings-wrap').removeClass('disable');
			}
		});
	};

    return{
        init: init
    };
})();

Block.init();