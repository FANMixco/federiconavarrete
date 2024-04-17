/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
let isMenuTriggered = false;
const navbarResponsive = gId('navbarResponsive');

function onReadyFreelancer() {

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = Array.from(gAll('#navbarResponsive .nav-link'));

    responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.addEventListener(eClick, () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if (smallScreen) {

        const el_autohide = document.querySelector('.autohide');

        // add padding-top to bady (if necessary)
        addPadding();

        if (el_autohide) {
            let last_scroll_top = 0;
            window.addEventListener('scroll', () => {
                if (navbarResponsive.classList.contains("show")) {
                    gId("menuExpander").click();
                }

                const scroll_top = window.scrollY;
                if (scroll_top < last_scroll_top) {
                    el_autohide.classList.remove('scrolled-down');
                    el_autohide.classList.add('scrolled-up');
                }
                else {
                    el_autohide.classList.remove('scrolled-up');
                    el_autohide.classList.add('scrolled-down');
                }
                last_scroll_top = scroll_top;
            });
        }
    }
}

function addPadding() {
    const width = window.innerWidth;
    //to be fixed if the foldables ever support the detection
    document.body.style.paddingTop = `${(window.innerHeight > width || window.matchMedia('(screen-spanning: single-fold-horizontal)').matches || width < 768) ? document.querySelector('.navbar').offsetHeight - 1 : 0 }px`;
}

// Navbar shrink function
let navbarShrink = () => {
    const navbarCollapsible = gId('mainNav');
    let scroll = window.scrollY;

    if (!navbarCollapsible) {
        return;
    }
    if (scroll <= 1) {
        navbarCollapsible.classList.remove('navbar-shrink');
    } else {
        navbarCollapsible.classList.add('navbar-shrink');
    }

    extraEvents(scroll);

    function extraEvents(scroll) {
        if (scroll > getHeight() * 0.20 && extraContact == 0 && !isMenuTriggered) {
            contactMeForm();
            extraContact++;
        }
        else if (scroll > getHeight() * 0.7) {
            const gScriptExist = gId('g_translate');

            if (!gScriptExist && !validLang.includes(uLang)) {
                const script = document.createElement('script');
                script.src = `${urlB}translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
                script.id = 'g_translate';
                document.body.appendChild(script);
                gId('google_translate_element').classList.remove('d-none');
            }
        }

        function getHeight() {
            const body = document.body,
                html = document.documentElement;

            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight, body.getBoundingClientRect().height);
        }
    }
};

if (document.readyState !== "loading") {
    onReadyFreelancer(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReadyFreelancer);
}