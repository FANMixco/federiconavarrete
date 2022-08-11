/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
function onReadyFreelancer() {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        let scroll = window.scrollY;

        if (!navbarCollapsible) {
            return;
        }
        if (scroll === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

        extraEvents(scroll);
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if (deviceType() === "Smartphone") {

        var el_autohide = document.querySelector('.autohide');
 
        // add padding-top to bady (if necessary)
        var navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = `${navbar_height}px`;

        if (el_autohide) {
            var last_scroll_top = 0;
            window.addEventListener('scroll', function() {
                if (document.getElementById("navbarResponsive").classList.contains("show")) {
                    document.getElementById("menuExpander").click();
                }

                let scroll_top = window.scrollY;
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
            // window.addEventListener
        }
        // if
    }    // ...your code here...

    document.addEventListener("click", function (event) {
        // if the clicked element isn't child of the navbar, you must close it if is open
        if (!event.target.closest("#mainNav") && document.getElementById("navbarResponsive").classList.contains("show")) {
            document.getElementById("menuExpander").click();
        }
    });
}

function extraEvents(scroll) {
    if (scroll > getHeight() * 0.20 && extraContact == 0 && !isMenuTriggered) {
        contactMeForm();
        extraContact++;
    }
    else if (scroll > getHeight() * 0.7) {
        const gScriptExist = document.getElementById('g_translate');
        
        if (!gScriptExist) {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.id = 'g_translate';
            document.body.appendChild(script);
        }
    }
}

if (document.readyState !== "loading") {
    onReadyFreelancer(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReadyFreelancer);
}