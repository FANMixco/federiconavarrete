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

if (!validLang.includes(language.split('-')[0])) {
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'nl,de,fr,it,en,pt', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
    }
}