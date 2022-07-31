const iframeApps = `<iframe title='Projects' id='iframeApps' src="apps.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

const iframePrezis = `<iframe title="Presentations" id='iframePrezis' src="prezis.html?isIframe=true" class="previewerIframe" allowfullscreen></iframe>`;

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
        window.open("https://federiconavarrete.com/apps.html");
    });
    
    const pptsFullScreen = document.getElementById("pptsFullScreen");
    
    pptsFullScreen.addEventListener('click', function() {
        window.open("https://federiconavarrete.com/prezis.html");
    });
    
    let cYear = new Date().getFullYear();
    
    const spanYear = document.getElementById("spanYear");
    
    spanYear.innerHTML = cYear === 2019 ? `${cYear}` : `2019 - ${cYear}`;
    
    [...document.getElementsByClassName('.ignore-click')].forEach(function(element) {
        element.addEventListener('click', x => false);
    });
}
if (document.readyState !== "loading") {
    onReadyPersonal(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReadyPersonal);
}