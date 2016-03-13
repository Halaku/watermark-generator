var wmScaleSlider = (function() {

    function sendValues(sliderBlock) {
        var value;
        value = sliderBlock.slider('value');
        wmScale = value;
    }

    function changeScale() {
        var wm = $('.processed_wm'),
            img = $('.processed_img'),
            wmHeight = wm.attr('data-height'),
            wmWidth = wm.attr('data-width');
        wm.css('width', wmWidth * wmScale)
            .css('height', wmHeight * wmScale);
    }

    function changePosition() {
        var wm = $('.processed_wm'),
            img = $('.processed_img'),
            wmLeftCurrent = parseInt(wm.css('left').replace('px', '')),
            wmTopCurrent = parseInt(wm.css('top').replace('px', '')),
            wmHeightCurrent = parseInt(wm.height()),
            wmWidthCurrent = parseInt(wm.width()),
            spinnerX = $('#coords-x'),
            spinnerY = $('#coords-y');

        if ((wmLeftCurrent + wmWidthCurrent) > img.width()) {
            wm.css('left', wmLeftCurrent - (wmLeftCurrent + wmWidthCurrent - img.width()));
            spinnerX.val(parseInt(wm.css('left').replace('px', '')));
        }
        if ((wmTopCurrent + wmHeightCurrent) > img.height()) {
            wm.css('top', wmTopCurrent - (wmTopCurrent + wmHeightCurrent - img.height()));
            spinnerY.val(parseInt(wm.css('top').replace('px', '')));
        }
        // ^
        // | This is just a mathemetic
        // |
    }

    return {
        init: function() {
            var sliderBlock = $('.scale__block'),
                wmScale;

            sliderBlock.slider({
                range: "min",
                min: 0,
                max: 1,
                step: 0.01,
                value: 1,
                slide: function() {
                    sendValues(sliderBlock);
                    changeScale();
                    changePosition();
                    Positioning.coords();
                },
                create: function() {
                    sendValues(sliderBlock);
                    changeScale();
                    changePosition();
                    Positioning.coords();
                },
                change: function() {
                    sendValues(sliderBlock);
                    changeScale();
                    changePosition();
                    Positioning.coords();
                }
            });
        }
    };
})();

wmScaleSlider.init();
