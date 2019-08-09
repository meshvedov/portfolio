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
        if (path)
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

// ------- Slider --------------------------------------------------------------

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
            activeItem.removeClass('slide-active').css('top', '-' + direct + '%');
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
    let arrowDown = document.querySelector('.slider__buttons-arrow-down'),
        arrowUp = document.querySelector('.slider__buttons-arrow-up'),
        sliderFirst = document.querySelector('.slider-first'),
        sliderSecond = document.querySelector('.slider-second'),
        slidesSecond = sliderSecond.querySelectorAll('.slider__buttons-item'),
        slidesFirst = sliderFirst.querySelectorAll('.slider__buttons-item'),
        sliderWorkList = document.querySelector('.slider__work-list'),
        slidesWork = sliderWorkList.querySelectorAll('.slider__work-item'),
        ind1 = 0, ind2 = 1, ind3 = 2, countSlides = slidesWork.length;


    function hideBigSlides(i) {
        let slides = document.querySelectorAll('.slider__work-item');

        slides.forEach(slide => slide.style.display = 'none');
        slides[i].style.display = 'block';
    }

    hideBigSlides(ind2);

    function showBigSlide(i) {
        let activeBigSlide = sliderWorkList.querySelector("li[style='display: block;']");
        activeBigSlide.style.display = 'none';
        slidesWork[i].style.display = 'block';
    }

    function moveSlide(element, direct, i) {
        let direction = direct === 'down' ? '100%' : '-100%',
            activeSlide = element.querySelector('.slide-active'),
            slides = element.querySelectorAll('.slider__buttons-item'),
            nextSlide = slides[i];

        activeSlide = activeSlide === null ? element.children[i] : activeSlide;
        activeSlide.classList.remove('slide-active');
        activeSlide.style.top = direction;

        if (nextSlide !== undefined) {
            nextSlide.classList.add('slide-active');
        }
    }

    return {
        init: function () {
            arrowDown.addEventListener('click', (e) => {
                e.preventDefault();
                // debugger;
                if (ind1 < countSlides - 2) {
                    moveSlide(sliderFirst, 'down', ++ind1);
                }

                if (ind2 < countSlides - 1) {
                    showBigSlide(++ind2);
                }

                if (ind3 < countSlides) {
                    moveSlide(sliderSecond, 'up', ++ind3);
                }
            });

            arrowUp.addEventListener('click', function (e) {
                e.preventDefault();

                if (ind1 > -1) {
                    moveSlide(sliderFirst, 'up', --ind1);
                }

                if (ind2 > 0) {
                    showBigSlide(--ind2);
                }

                if (ind3 > 1) {
                    moveSlide(sliderSecond, 'down', --ind3);
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