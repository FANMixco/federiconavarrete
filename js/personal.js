$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $(".ignore-click").click(function() {
        return false;
    });
    
    var marginTop = 0;
    var heightIFrame = 600;

    var os = getMobileOperatingSystem();
    var smallScreenMobileOS = (os == "iOS" || os == "Android") && window.screen.width < 400;

    if (!smallScreenMobileOS) {
      $("#spanMenu").html("Menu&nbsp;<i class='fas fa-bars'></i>");
    }
    else {
      $("#spanMenu").html("<i class='fas fa-bars'></i>");
      marginTop = -40;
      heightIFrame = 560;
    }

    var lastScrollTop = 0;
    var $navbar = $('.navbar');
    var navbarHeight = $navbar.outerHeight();
    var movement = 0;
    var lastDirection = 0;

    $(window).scroll(function(event) {
        if (smallScreenMobileOS) {
            var st = $(this).scrollTop();
            movement += st - lastScrollTop;

            if (st > lastScrollTop) { // scroll down
                if (lastDirection != 1) {
                    movement = 0;
                }
                var margin = Math.abs(movement);
                if (margin > navbarHeight) {
                    margin = navbarHeight;
                }
                margin = -margin;
                $navbar.css('margin-top', margin + "px")

                lastDirection = 1;
            } else { // scroll up
                if (lastDirection != -1) {
                    movement = 0;
                }
                var margin = Math.abs(movement);
                if (margin > navbarHeight) {
                    margin = navbarHeight;
                }
                margin = margin - navbarHeight;
                $navbar.css('margin-top', margin + "px")

                lastDirection = -1;
            }

            lastScrollTop = st;
        }
    });

    $('#contactMeForm').html(`<iframe src="contact.html" height="${heightIFrame}px" width="100%" frameborder="0" scrolling="no" style="margin-top:${marginTop}px"></iframe>`);
    
    $("#linkContactMe").click(function(e){
        e.preventDefault();
        $(this).tooltip('hide');
        $("#contactMe").modal("show");
    });
    
    setTimeout(function(){
        $("#contactMe").modal("show");
    }, 30000);
});
