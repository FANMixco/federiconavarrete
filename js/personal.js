const iframeElSalvador = `<iframe title='El Salvador Map' id='iframeElSalvador' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl" class="previewerIframe" allowfullscreen></iframe>`;

const iframeApps = `<iframe title='Projects' id='iframeApps' src="apps.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const iframePrezis = `<iframe title="Presentations" id='iframePrezis' src="prezis.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

$(function() {
    let cYear = new Date().getFullYear();
    $("#spanYear").text(cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`);

    $("#appsFullScreen").click(function(){
        window.open("https://federiconavarrete.com/apps.html");
    });
    $("#pptsFullScreen").click(function(){
        window.open("https://federiconavarrete.com/prezis.html");
    });

    $('[data-toggle="tooltip"]').tooltip();
    $(".ignore-click").click(function() {
        return false;
    });

    var marginTop = 0;
    var heightIFrame = 600;

    var smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";

    if (!smallScreenMobileOS) {
        $("#spanMenu").html("Menu&nbsp;<i class='fas fa-bars'></i>");
        $("#btnExtraHobbies").hide();
        if (WURFL.is_mobile) {
            $(".btnOptional").hide();
            $("#btnExtraHobbies").show();
        }

        setTimeout(function() {
            $("#divSkillsContainer").css("background-color", "rgba(12,12,12,0.95)");
            $("#divSkillsContainer").css("padding-top", "15px");
            $("#divSkillsContainer").css("border-radius", "20px");
        }, 100);
    } else {
        $(".btnOptional").hide();
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

    $('#contactMeForm').html(`<iframe src="pages/contact.html" height="${heightIFrame}px" width="100%" frameborder="0" scrolling="no" style="margin-top:${marginTop}px"></iframe>`);

    $("#linkContactMe").click(function(e) {
        e.preventDefault();
        $(this).tooltip('hide');
        $("#contactMe").modal("show");
    });

    $("#aElSalvador").click(function(){
        if ($("#iframeElSalvador").length == 0)
            $("#divIframElSalvador").append(iframeElSalvador);
    });

    $("#aAppsPreview").click(function(){
        if ($("#iframeApps").length == 0)
            $("#divApps").append(iframeApps);
    });

    $("#aPPTPreview").click(function(){
        if ($("#iframePrezis").length == 0)
            $("#divPrezis").append(iframePrezis);
    });

    setTimeout(function() {
        if (localStorage.getItem("firstTimeContact") === null) {
            localStorage.setItem("firstTimeContact", Date.now());
            $("#contactMe").modal("show");
        }
    }, 30000);
});

 PDFObject.embed("/testimonials/20190603165400926.pdf", "#reviewGabrielaPDF");