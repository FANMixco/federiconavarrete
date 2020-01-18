const iframeElSalvador = `<iframe title='El Salvador Map' id='iframeElSalvador' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984252.4374393197!2d-90.05167866086293!3d13.749114461377241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6327a659640657%3A0x6f9a16eb98854832!2sEl+Salvador!5e0!3m2!1sen!2spl!4v1555793789038!5m2!1sen!2spl" class="previewerIframe" allowfullscreen></iframe>`;

const iframeApps = `<iframe title='Projects' id='iframeApps' src="apps.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const iframePrezis = `<iframe title="Presentations" id='iframePrezis' src="prezis.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

$(function() {
    let cYear = new Date().getFullYear();
    $("#spanYear").text(cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`);

    $("#appsFullScreen").click(function(){
        window.open("https://federiconavarrete.com/apps.html");
    });
    $("#pptsFullScreen").click(function(){
        window.open("https://federiconavarrete.com/prezis.html");
    });

    $(".ignore-click").click(function() {
        return false;
    });

    let marginTop = 0;
    let heightIFrame = 600;

    switch (WURFL.form_factor) {
        case "Smartphone":
            $("#imgProfile").attr("src",`img/photos/profile_small.jpg`);
            break;
        default:
            $("#imgProfile").attr("src",`img/photos/profile.jpg`);
            break;
    }

    $("#imgProfile").show();

    let lastScrollTop = 0;
    let $navbar = $('.navbar');
    let navbarHeight = $navbar.outerHeight();
    let movement = 0;
    let lastDirection = 0;

    $(window).scroll(function(event) {
        if (smallScreenMobileOS) {
            let st = $(this).scrollTop();
            movement += st - lastScrollTop;

            if (st > lastScrollTop) { // scroll down
                if (lastDirection != 1) {
                    movement = 0;
                }
                let margin = Math.abs(movement);
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
                let margin = Math.abs(movement);
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

    $('[data-toggle="tooltip"]').tooltip();
});