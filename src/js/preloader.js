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
    let ind = 0;
    let arrowDown = document.querySelector('.slider__buttons-arrow-down');
    let arrowUp = document.querySelector('.slider__buttons-arrow-up');
    let sliderFirst = document.querySelector('.slider-first');
    let sliderSecond = document.querySelector('.slider-second');
    let slidesSecond = sliderSecond.querySelectorAll('.slider__buttons-item');
    let slidesFirst = sliderFirst.querySelectorAll('.slider__buttons-item');
    
    function hideSlides() {
        let slides = document.querySelectorAll('.slider__work-item');
        slides.forEach(slide => slide.style.display = 'none');
        slides[0].style.display = 'block';
    }
    hideSlides();

    function moveBigSlide(i) {

    }

    function moveSlide(element, direct, i) {
        let direction = direct === 'down' ? '100%' : '-100%';
        let activeSlide = element.querySelector('.slide-active');
        activeSlide = activeSlide === null ? element.children()[i] : activeSlide;
        activeSlide.classList.remove('slide-active');
        activeSlide.style.top = direction;
        let slides = element.querySelectorAll('.slider__buttons-item');
        let nextSlide = slides[i];
        // let nextSlide = direct === 'down' ? slides[++ind] : slides[--ind];

        nextSlide.classList.add('slide-active');
    }

    return {
        init: function () {
            arrowDown.addEventListener('click', (e) => {
                e.preventDefault();
                // debugger;
                if (ind < slidesFirst.length - 1) {
                    moveSlide(sliderFirst, 'down', ind);
                    moveBigSlide(++ind);
                    moveSlide(sliderSecond, 'up', ++ind);
                }
            });

            arrowUp.addEventListener('click', function (e) {
                e.preventDefault();

                if (ind > 0) {
                    moveSlide(sliderFirst, 'up', --ind);
                }
            })
        }
    }
}());

$(function () {
    preloader.init();
    // slider.init();
    slideShow.init();
});