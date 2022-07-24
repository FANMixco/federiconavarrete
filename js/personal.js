const iframeApps = `<iframe title='Projects' id='iframeApps' src="apps.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const iframePrezis = `<iframe title="Presentations" id='iframePrezis' src="prezis.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

const aAppsPreview = document.getElementById("aAppsPreview");

aAppsPreview.addEventListener('click', function(e) {
    if (!document.getElementById('iframeApps')) {
        divApps.innerHTML += iframeApps;
    }
});

const aPPTPreview = document.getElementById("aPPTPreview");

aPPTPreview.addEventListener('click', function() {
    if (!document.getElementById('iframePrezis')) {
        const divPrezis = document.getElementById("divPrezis");
        divPrezis.innerHTML += iframePrezis;
    }
});

window.addEventListener('DOMContentLoaded', (event) => {
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

    [...document.getElementsByClassName('.ignore-click')].forEach(function(element) {
        element.addEventListener('click', x => false);
    });

    try {
        const imgBook = document.getElementById('imgBook');
        let size = WURFL.form_factor === "Smartphone" ? "_small" : WURFL.form_factor === "Tablet" ? "_medium" : "";
        
        imgBook.src = `img/mybook/second${size}.jpg`;
        imgBook.setAttribute("loading", "lazy");    
    } catch { }

    let lastScrollTop = 0;
    let navbarHeight = document.getElementsByClassName('navbar')[0].offsetHeight;
    let movement = 0;
    let lastDirection = 0;

    window.onscroll = function() {
        let smallScreenMobileOS = WURFL.is_mobile && WURFL.form_factor === "Smartphone";
        
        if (smallScreenMobileOS) {
            let st = document.scrollingElement.scrollTop;
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
                $navbar.css('margin-top', `${margin}px`)

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
                $navbar.css('margin-top', `${margin}px`)

                lastDirection = -1;
            }

            lastScrollTop = st;
        }
    };
});