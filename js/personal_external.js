const fURL = 'https://federiconavarrete.com/';

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

//getScripts.js
const getScript = url => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;

  script.onerror = reject;

  script.onload = script.onreadystatechange = function() {
    const loadState = this.readyState;

    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return;

    script.onload = script.onreadystatechange = null;

    resolve();
  }

  document.head.appendChild(script);
});

function onReadyPersonal() {
    let cYear = new Date().getFullYear();
    
    const spanYear = gId("spanYear");
    
    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;
    
    document.querySelectorAll('.ignore-click').forEach(element => {
        element.addEventListener('click', () => false);
    });
}

if (document.readyState !== "loading") {
  onReadyPersonal();
} else {
  document.addEventListener("DOMContentLoaded", onReadyPersonal);
}

if (smallScreen) {
  const imgProfile = gId('imgProfile');
  imgProfile.classList.add('mb-5', 'd-block', 'mx-auto');
} else {
  const profileDiv = gId('profile-div');
  const mediaQuery = window.matchMedia('(min-width: 769px)');

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
  // Get the div element
  const element = gId("hContent");
  // Get the current width of the window
  const width = window.innerWidth;

  element.className = (width < 1200) ? "container-fluid" :  "container";

  devicePortraitAndLong = (actualDev === devs[1] || actualDev === devs[2]) && window.innerHeight > window.innerWidth;

  if (gId('contactMeI'))
    iFrameHResize('contactMeI');
}

// Call the function when the page loads
window.addEventListener('resize', screenResize);
screenResize();

if (smallScreenMobileOS) {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
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
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-4X4X4PDHN7');
}

window.onload = function() {
  onReadyExternal();
};

if (!validLang.includes(uLang)) {
  function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'nl,de,fr,it,en,pt', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
  }
}