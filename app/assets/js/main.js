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

+(function () {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
})();
+(function () {
    $("#arrow-down").click(function() {
        var navHeight = $("#main-nav").height();
        $('html, body').animate({
            scrollTop: $("#about").offset().top-navHeight
        }, 1500);
    });
})();
+function(s){"use strict";var l=40,c=s(".simple-fixed"),o="sticky";s(window).scroll(function(){var i=s(this).scrollTop();i>l?c.addClass(o):c.removeClass(o)})}(jQuery),+function(){particlesJS.load("particles-js","assets/particles.json",function(){console.log("callback - particles.js config loaded")})}();
//# sourceMappingURL=main.js.map
