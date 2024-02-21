let nLang = (navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage)).split('-')[0];

let supportedLang = ['en', 'es', 'zh'];

let translations;

const lang = supportedLang.includes(nLang) ? nLang : 'en';

fetchData(`js/i18n/lang-${lang}.min.json`)
.then((data) => {
    translations = data.translations;
    document.querySelectorAll('[data-translation]').forEach(item => {
        item.innerHTML = translations[`${item.dataset.translation}`];
    });
})
.catch((e) => {
    console.error(e);
});