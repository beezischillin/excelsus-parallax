function calculateImageHeight(image, newWidth) {
    var width  = image.width;
    var height = image.height;
    return newWidth * height / width;
}

function calculateCanvasHeight(_this) {
    var height = 0;
    if (_this.aspectRatio) {
        var tempW      = parseInt(_this.aspectRatio.split('/')[0]);
        var tempH      = parseInt(_this.aspectRatio.split('/')[1]);
        var percentage = tempH  * 100 / tempW;
        height     = wWidth * percentage / 100;
    } else if (_this.h) {
        if (_this.h.indexOf('%') == -1) {
            height = parseInt(_this.h.replace('px', ''));
        } else {
            height = parseInt(_this.h.replace('%', '')) * wHeight / 100;
        }
    }
    return parseInt(height);
}

function setCanvasHeight(_this) {
    var cHeight = calculateCanvasHeight(_this);
    _this._this.height(cHeight);
    _this.canvas.width(wWidth);
    _this.canvas.height(cHeight);
    _this.context.canvas.width  = wWidth;
    _this.context.canvas.height = cHeight;
}

function renderCanvasImage(_this, image, slideIt) {
    var canvasHeight = _this.canvas.height();
    var imgHeight    = calculateImageHeight(image, wWidth);
    var margin       = -1 * (imgHeight - _this.canvas.height()) / 2;
    var margin2      = ( windowY - _this.canvas.offset().top ) * 0.2;

    if (!slideIt) {
        _this.context.drawImage(image, 0, margin + margin2, wWidth, imgHeight);
    } else {
        var activationOffset = 40;

        var newBottom = 0;
        if ( ( windowY + (activationOffset) - _this.offset ) > 0 ) {
            newBottom = ( ( windowY + activationOffset - _this.offset ) * _this.speed * 18);
        }

        var newImgHeight    = image.height - (image.height * newBottom / canvasHeight);
        var newCanvasHeight = imgHeight - (imgHeight * newBottom / canvasHeight);

        newImgHeight    = Math.max(1, Math.floor(newImgHeight));
        newCanvasHeight = Math.max(1, Math.floor(newCanvasHeight));

        _this.context.drawImage(image,
            0, 0,                      // Start at 10 pixels from the left and the top of the image (crop),
            image.width, newImgHeight, // "Get" a `80 * 30` (w * h) area from the source image (crop),
            0, margin + margin2,       // Place the result at 0, 0 in the canvas,
            wWidth, newCanvasHeight);  // With as width / height: 160 * 60 (scale)
    }

}

var windowY = window.pageYOffset;

var wWidth  = $(window).width();
var wHeight = $(window).height();

var requestAnimationFrame = window.requestAnimationFrame       ||
                            window.mozRequestAnimationFrame    ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame     ||
                            window.oRequestAnimationFrame;

function shouldFallback() {
    return !requestAnimationFrame && !isMobile.any;
}

jQuery(document).ready(function($){

    var parallaxObjs = [];
    var arrow        = $('.parallax .arrow');

    $(window).scroll(function(){
        if (!shouldFallback()) {
            windowY = window.pageYOffset;

            requestAnimationFrame(function(){
                $(parallaxObjs).each(function(){
                    this.offset = this._this.offset().top;

                    this.context.clearRect(0, 0, wWidth, this.canvas.height());
                    renderCanvasImage(this, this.baseImg);
                    if (this.overlayImg)
                        renderCanvasImage(this, this.overlayImg, true);
                });
            });
        }
    });

    $(window).resize(function(){
        if (!shouldFallback()) {
            windowY = window.pageYOffset;
            wWidth  = $(window).width();
            wHeight = $(window).height();

            requestAnimationFrame(function(){
                $(parallaxObjs).each(function(){
                    setCanvasHeight(this);

                    this.offset = this._this.offset().top;

                    this.context.clearRect(0, 0, wWidth, this.canvas.height());
                    renderCanvasImage(this, this.baseImg);
                    if (this.overlayImg)
                        renderCanvasImage(this, this.overlayImg, true);
                });
            });
        }
    });

    $('.parallax').each(function(){
        var temp = {};

        temp._this = $(this);

        if (shouldFallback())
            temp._this.addClass('p ');

        temp._this.prepend('<canvas></canvas>');

        temp.canvas      = temp._this.find('canvas');
        temp.context     = temp.canvas[0].getContext('2d');
        temp.aspectRatio = temp._this.data('aspect-ratio');
        temp.h           = temp._this.data('height');
        temp.speed       = parseFloat(temp._this.data('speed'));

        temp.offset      = temp._this.offset().top;

        temp.baseUrl     = temp._this.data('base');
        temp.overlayUrl  = temp._this.data('overlay');
        temp.mobileUrl   = (temp._this.data('mobile')) ? temp._this.data('mobile') : temp._this.data('base');

        var fallbackImg  = $('<img>').attr('src', temp.mobileUrl)
                .addClass('fallbackImg hidden-lg')
            ;
        temp._this.prepend(fallbackImg);

        if (!shouldFallback()) {
            setCanvasHeight(temp);

            temp.baseImg        = new Image();
            temp.baseImg.src    = temp.baseUrl;
            temp.baseImg.onload = function() {
                temp.baseLoaded = true;

                if (!temp.overlayUrl || temp.overlayLoaded) {
                    renderCanvasImage(temp, temp.baseImg, false);
                    if (temp.overlayUrl)
                        renderCanvasImage(temp, temp.overlayImg, true);

                    $(window).trigger('scroll');
                }
            };
            if (temp.overlayUrl) {
                temp.overlayImg        = new Image();
                temp.overlayImg.src    = temp.overlayUrl;
                temp.overlayImg.onload = function() {
                    temp.overlayLoaded = true;

                    if (temp.baseLoaded) {
                        renderCanvasImage(temp, temp.baseImg, false);
                        renderCanvasImage(temp, temp.overlayImg, true);

                        $(window).trigger('scroll');
                    }
                };
            }
        }

        parallaxObjs.push(temp);
    });

});