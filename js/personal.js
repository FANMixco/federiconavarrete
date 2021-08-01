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
            $("#imgBook").attr("src",`img/mybook/book_small.jpg`);
            break;
        case "Tablet":
            $("#imgProfile").attr("src",`img/photos/profile.jpg`);
            $("#imgBook").attr("src",`img/mybook/book_medium.jpg`);
            break;
        default:
            $("#imgProfile").attr("src",`img/photos/profile.jpg`);
            $("#imgBook").attr("src",`img/mybook/book_medium.jpg`);
            break;
    }

    $("#imgProfile").show();

    let lastScrollTop = 0;
    let $navbar = $('.navbar');
    let navbarHeight = $navbar.outerHeight();
    let movement = 0;
    let lastDirection = 0;

    $(window).scroll(function(event) {
        let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";
        
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