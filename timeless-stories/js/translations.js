let lang = 'en';

let nLang = (navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage)).split('-')[0];

let supportedLang = ['en', 'es', 'zh'];

let translations;

lang = supportedLang.includes(nLang) ? nLang : lang;

fetchData(`js/i18n/lang-${lang}.json`)
.then((data) => {
    translations = data.translations;
    document.querySelectorAll('[data-translation]').forEach(item => {
        item.innerHTML = translations[`${item.dataset.translation}`];
    });
})
.catch((e) => {
    console.error(e);
});