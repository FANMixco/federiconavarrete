/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
function onReadyFreelancer() {
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        let scroll = window.scrollY;

        navbarCollapsible?.classList.toggle('navbar-shrink', scroll !== 0);
        extraEvents(scroll);
    };

    const closeMenu = () => document.getElementById("navbarResponsive")?.classList.contains("show") && document.getElementById("menuExpander")?.click();

    const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));

    responsiveNavItems.forEach(responsiveNavItem =>
        responsiveNavItem.addEventListener('click', () => document.body.querySelector('.navbar-toggler')?.click())
    );

    if (deviceType() === 'Smartphone') {
        const el_autohide = document.querySelector('.autohide');

        if (el_autohide) {
            let last_scroll_top = 0;
            window.addEventListener('scroll', () => {
                const navbarResponsive = document.getElementById('navbarResponsive');
                navbarResponsive?.classList.contains('show') && document.getElementById('menuExpander')?.click();

                let scroll_top = window.scrollY;
                el_autohide.classList.toggle('scrolled-down', scroll_top > last_scroll_top);
                el_autohide.classList.toggle('scrolled-up', scroll_top < last_scroll_top);
                last_scroll_top = scroll_top;
            });
            document.body.style.paddingTop = `${document.querySelector('.navbar')?.offsetHeight}px`;
        }
    }

    document.addEventListener('click', closeMenu);
    document.addEventListener('scroll', onReadyFreelancer);
}

if (document.readyState !== 'loading') 
    onReadyFreelancer();
else 
    document.addEventListener('DOMContentLoaded', onReadyFreelancer);