const iframeApps = getIframe('Projects', 'apps.html?isIframe=true', 'class="previewerIframe" allowfullscreen');

const iframePrezis = getIframe("Presentations", "prezis.html?isIframe=true", `class="previewerIframe" allowfullscreen id='iframePrezis'`);

const fURL = 'https://federiconavarrete.com/';

const imgLocPortfolio = 'img/portfolio/';
const imgLocArticles = 'img/articles/';

function onReadyPersonal() {
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
    
    const appsFullScreen = document.getElementById("appsFullScreen");
    appsFullScreen.addEventListener('click', function() {
        window.open(`${fURL}/apps.html`);
    });
    
    const pptsFullScreen = document.getElementById("pptsFullScreen");
    
    pptsFullScreen.addEventListener('click', function() {
        window.open(`${fURL}/prezis.html`);
    });
    
    let cYear = new Date().getFullYear();
    
    const spanYear = document.getElementById("spanYear");
    
    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;
    
    [...document.getElementsByClassName('.ignore-click')].forEach(function(element) {
        element.addEventListener('click', x => false);
    });
}
if (document.readyState !== "loading") {
    onReadyPersonal();
} else {
    document.addEventListener("DOMContentLoaded", onReadyPersonal);
}