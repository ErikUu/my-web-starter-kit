+(function () {
    $("#arrow-down").click(function() {
        var navHeight = $("#main-nav").height();
        $('html, body').animate({
            scrollTop: $("#about").offset().top-navHeight
        }, 1500);
    });
})();