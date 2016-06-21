+(function ($) {

    "use strict";

    //options
    var stickPoint = 40;

    //selectors & classes
    var $nav       = $(".simple-fixed");
    var sticky    = "sticky";

    //invokes on scroll and adds class to simple-nav depending on
    //where the sticking point (stickPoint) is
    $(window).scroll(function () {

        var scroll = $(this).scrollTop();

        if (scroll > stickPoint) {
            $nav.addClass(sticky);
        } else {
            $nav.removeClass(sticky);
        }

    });

})(jQuery);
