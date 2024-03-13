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
    
    const spanYear = document.getElementById("spanYear");
    
    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;
    
    [...document.getElementsByClassName('ignore-click')].forEach(function(element) {
        element.addEventListener('click', x => false);
    });
}
if (document.readyState !== "loading") {
  onReadyPersonal();
} else {
  document.addEventListener("DOMContentLoaded", onReadyPersonal);
}

if (smallScreenMobileOS || equalScreen) {
  const imgProfile = document.getElementById('imgProfile');
  imgProfile.classList.add('mb-5', 'd-block', 'mx-auto');
} else {
  const profileDiv = document.getElementById('profile-div');
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
  const element = document.getElementById("hContent");
  // Get the current width of the window
  const width = window.innerWidth;

  element.className = (width < 1200) ? "container-fluid" :  "container";

  devicePortraitAndLong = (actualDev === "Desktop" || actualDev === "Tablet") && window.innerHeight > window.innerWidth;

  if (document.getElementById('contactMeI'))
    iFrameHResize('contactMeI');
}

// Call the function when the page loads
screenResize();

if (smallScreenMobileOS) {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    document.getElementById("contactMeFloat").style.display = (currentScroll > lastScrollTop) ? 'none' : 'block';
    lastScrollTop = currentScroll;
  }, false);
}

//external
function onReadyExternal() {
  getScript('https://www.googletagmanager.com/gtag/js?id=G-4X4X4PDHN7')
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

  getScript('https://cdn-cookieyes.com/client_data/c7c09fa5c642b8cdc1a5b1a9/script.js')
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

if (!validLang.includes(uLang.split('-')[0])) {
  function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'nl,de,fr,it,en,pt', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
  }
}