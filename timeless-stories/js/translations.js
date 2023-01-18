let lang = 'en';

let nLang = (navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage)).split('-')[0];

let supportedLang = ['en', 'es', 'zh'];

lang = supportedLang.includes(nLang) ? nLang : lang;

getScript(`js/i18n/lang-${lang}.js`)
.then(() => {
    document.querySelectorAll('[data-translation]').forEach(item => {
        item.innerHTML = translations[`${item.dataset.translation}`];
    });
})
.catch((e) => {
    console.error(e);
});