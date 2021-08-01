const iframeApps = `<iframe title='Projects' id='iframeApps' src="apps.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const iframePrezis = `<iframe title="Presentations" id='iframePrezis' src="prezis.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

$(function() {
    let cYear = new Date().getFullYear();

    const spanYear = document.getElementById("spanYear");

    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;

    const appsFullScreen = document.getElementById("appsFullScreen");
    appsFullScreen.addEventListener('click', function() {
        window.open("https://federiconavarrete.com/apps.html");
    });

    const pptsFullScreen = document.getElementById("pptsFullScreen");

    pptsFullScreen.addEventListener('click', function() {
        window.open("https://federiconavarrete.com/prezis.html");
    });

    $(".ignore-click").on("click", function() {
        return false;
    });

    let marginTop = 0;
    let heightIFrame = 600;

    const imgProfile = $("#imgProfile");
    const imgBook = $("#imgBook");

    switch (WURFL.form_factor) {
        case "Smartphone":
            imgProfile.attr("src", "img/photos/profile_small.jpg");
            imgBook.attr("src", "img/mybook/book_small.jpg");
            break;
        case "Tablet":
            imgProfile.attr("src", "img/photos/profile.jpg");
            imgBook.attr("src", "img/mybook/book_medium.jpg");
            break;
        default:
            imgProfile.attr("src", "img/photos/profile.jpg");
            imgBook.attr("src", "img/mybook/book_medium.jpg");
            break;
    }

    $("#imgProfile").show();

    let lastScrollTop = 0;
    let $navbar = $('.navbar');
    let navbarHeight = $navbar.outerHeight();
    let movement = 0;
    let lastDirection = 0;

    $(window).on("scroll", function(event) {
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

    const contactMeForm = document.getElementById("contactMeForm");

    contactMeForm.innerHTML += `<iframe src="pages/contact.html" height="${heightIFrame}px" width="100%" frameborder="0" scrolling="no" style="margin-top:${marginTop}px"></iframe>`;

    const aAppsPreview = document.getElementById("aAppsPreview");

    aAppsPreview.addEventListener('click', function(e) {
        if ($("#iframeApps").length == 0) {
            const divApps = document.getElementById("divApps");
            divApps.innerHTML += iframeApps;
        }
    });

    const aPPTPreview = document.getElementById("aPPTPreview");

    aPPTPreview.addEventListener('click', function() {
        if ($("#iframePrezis").length == 0) {
            const divPrezis = document.getElementById("divPrezis");
            divPrezis.innerHTML += iframePrezis;
        }
    });

    $('[data-toggle="tooltip"]').tooltip();
});