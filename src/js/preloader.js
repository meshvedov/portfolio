var preloader = (function () {
    var percentsTotal = 0,
        preloader = $(".preloader");

    var imgPath = $("*").map(function (ndx, element) {
        var background = $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';
        if (background != 'none') {
            path = background;
        }
        if (img) {
            path = $(element).attr('src');
        }
        if(path)
            return path;
    });

    var setPercent = function (total, current) {
        var percents = Math.ceil(current / total * 100);
        console.log(percents);
        $('.preloader__percents').text(percents + "%");
        if (percents >= 100) {
            preloader.fadeOut();
        }
    };

    var loadImages = function (images) {
        let countImg = 0;
        if (!images.length)
            preloader.fadeOut();
        images.forEach(function (img, i, images) {
            var reg = /assets\/.*\.(jpg|png)/;
            var str = reg.exec(img);
            if (str != null) {
                console.log(str[0]);
                var fakeImage = $('<img>', {
                    attr: {
                        src: str[0]
                    }
                });
                fakeImage.on('load', function () {
                    percentsTotal++;
                    setPercent(++countImg, percentsTotal);
                });
            }
        });
    }

    return {
        init: function () {
            var imgs = imgPath.toArray();
            console.log(imgs);
            loadImages(imgs);
        }
    }

}());

// ------- Slider ---------
var slider = (function () {
    var counter = 1,
        duration = 300,
        inProcess = false;

    var moveSlide = function (container, direction) {
        var items = $(container).find(".slider__buttons-item"),
            activeItem = items.filter('.slide-active'),
            direct = direction == "down" ? 100 : -100;

        if (counter >= 4) counter = 0;

        var reqItem = items.eq(counter);

        activeItem.animate({top: direct + '%'});
        reqItem.animate({top: 0}, function () {
            activeItem.removeClass('slide-active').css('top', '-'+direct+'%');
            $(this).addClass('slide-active');
            inProcess = false;
        });

    };
    return {
        init: function () {
            $(".slider__buttons-arrow-down, .slider__buttons-arrow-up").on('click', function (e) {
                e.preventDefault();

                if (!inProcess) {
                    moveSlide(".slider-first", "down");
                    moveSlide(".slider-second", "up");
                    counter++;
                    inProcess = true;
                }

            });
        }
    }
}());

var slideShow = (function () {

    return {
        init: function () {
            
        }
    }
}());

$(function () {
    preloader.init();
    slider.init();
});