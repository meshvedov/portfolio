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
        if (!images.length)
            preloader.fadeOut();
        images.forEach(function (img, i, images) {
            var reg = /assets\/.*\.(jpg|png)/;
            var str = reg.exec(img);
            console.log(str[0]);
           var fakeImage = $('<img>', {
               attr: {
                   src: str[0]
               }
           });
           fakeImage.on('load', function () {
               percentsTotal++;
               setPercent(images.length, percentsTotal);
           });
        });
    }

    return {
        init: function () {
            var imgs = imgPath.toArray();
            console.log(imgs);
            loadImages(imgs);
        }
    }

})();

$(function () {
    preloader.init();
});