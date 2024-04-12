const fURL = 'https://federiconavarrete.com/',
      imgLocPortfolio = 'img/portfolio/',
      imgLocArticles = 'img/articles/';

//getScripts.js
const getScript = url => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onerror = reject;

    script.onload = script.onreadystatechange = function () {
        const loadState = this.readyState;

        if (loadState && loadState !== 'loaded' && loadState !== 'complete') return;

        script.onload = script.onreadystatechange = null;

        resolve();
    }

    document.head.appendChild(script);
});

function onReadyPersonal() {
    const cYear = new Date().getFullYear(),
          spanYear = gId("spanYear"),
          dTrans = gAll('[data-translation]');

    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;

    gAll('.ignore-click').forEach(element => {
        element.addEventListener(eClick, () => false);
    });

    if (totalGenerics < dTrans.length) {
        loadGenerics(dTrans);
    }

    gAll('.mFix').forEach(item => {
        item.addEventListener(eClick, () => {
            scrollToLoc(item.getAttribute('href').slice(1));
        });
    });

    if (window.location.hash) {
        scrollToLoc(window.location.hash.substring(1), 8);
    }

    try {
        if (failedDMenu) {
            loadDynamicMenu();
        }
    } catch { }
}

function closeMenu() {
    if (navbarResponsive.classList.contains("show")) {
        gId("menuExpander").click();
    }
}

function scrollToLoc(loc, max = 5) {
    const idLoc = gId(loc),
          cTop = idLoc.offsetTop;

    let scrollCount = 0;
    
    const scrollInterval = setInterval(() => {
        const ncTop = idLoc.offsetTop;

        if (cTop < ncTop) {
            idLoc.scrollIntoView({ behavior: 'smooth' });
            scrollCount++;
        } else {
            clearInterval(scrollInterval);
        }

        if (scrollCount === max) {
            clearInterval(scrollInterval);
        }
    }, 500);
}

function onLoadedPE() {
    onReadyExternal()
    onReadyPersonal();

    // Add event listener to document
    document.addEventListener(eClick, (event) => {
        //const isClickInsideNavbar = gId('mainNav').contains(event.target);
        // If click is outside navbar, close navbar
        if (!gId('mainNav').contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener('resize', screenResize);

    if (!validLang.includes(uLang)) {
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'nl,de,fr,it,en,pt', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
        }
    }
}

if (smallScreen) {
    gId('imgProfile').classList.add('mb-5', 'd-block', 'mx-auto');
} else {
    const profileDiv = gId('profile-div'),
          mediaQuery = window.matchMedia('(min-width: 769px)');

    function handleTabletChange(e) {
        // Check if the media query is true
        if (!e.matches) {
            profileDiv.classList.remove('col-sm-auto');
            profileDiv.classList.add('col-sm', 'pt-4', 'mt-4', 'pb-4');
        } else {
            profileDiv.classList.remove('col-sm', 'pt-4', 'mt-4', 'pb-4');
            profileDiv.classList.add('col-sm-auto');
        }
    }

    // Register event listener
    mediaQuery.addEventListener('change', handleTabletChange);

    // Initial check
    handleTabletChange(mediaQuery);
}

// Define a function to change the class based on screen size
function screenResize() {
    closeMenu();
    // Get the div element
    //const element = gId("hContent");
    // Get the current width of the window
    const width = window.innerWidth;

    gId("hContent").className = (width < 1200) ? "container-fluid" : "container";

    devicePortraitAndLong = (actualDev === devs[1] || actualDev === devs[2]) && window.innerHeight > width;

    if (gId('contactMeI')) {
        iFrameHResize('contactMeI');
    }

    if (!navbarResponsive.classList.contains("show") && smallScreen) {
        setTimeout(addPadding, 250);
    }
}

screenResize();

if (smallScreenMobileOS) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        gId("contactMeFloat").style.display = (currentScroll > lastScrollTop) ? 'none' : 'block';
        lastScrollTop = currentScroll;
    }, false);
}

//external
function onReadyExternal() {
    getScript(`${urlB}www.googletagmanager.com/gtag/js?id=G-4X4X4PDHN7`)
        .then(() => {
            loadAnalytics();
        })
        .catch((e) => {
            console.error(e);
        });

    /*getScript('https://code.jivosite.com/widget/1D5ncamsoj')
    .catch((e) => {
        console.error(e);
    });*/

    getScript(`${urlB}cdn-cookieyes.com/client_data/c7c09fa5c642b8cdc1a5b1a9/script.js`)
        .catch((e) => {
            console.error(e);
        });
}

function loadAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-4X4X4PDHN7');
}

if (document.readyState !== "loading") {
    onLoadedPE();
} else {
    document.addEventListener("DOMContentLoaded", onLoadedPE);
}