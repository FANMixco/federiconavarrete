let language = window.navigator.userLanguage || window.navigator.language;
let lang = "en";
let currentLoc = '';

const langLoc = "js/data/";

lang = (language.includes('es')) ? "es" : lang;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

function createLink(item, className) {
    const link = document.createElement('a');
    link.classList.add(className);
    link.href = item.link;
    link.setAttribute('aria-label', item['aria-label']);
    link.setAttribute('title', item.title);
    link.setAttribute('id', item.id);

    if (item.target) {
        link.target = item.target;
    }

    const icon = document.createElement('i');
    icon.classList.add(item.icon);

    link.appendChild(icon);
    return link;
}

function createTextElement(text) {
    const span = document.createElement('span');
    span.innerHTML = text;
    return span;
}

fetchData(`${langLoc}${lang}/basic.json`)
.then(data => {
    document.querySelectorAll('[data-translation]').forEach(item => {
        item.innerHTML = data[item.dataset.translation];
    });
});

fetchData(`${langLoc}${lang}/sublinks.json`)
.then(data => {
    const linksContainer = document.getElementById('sub-links');

    data.forEach(item => {
        const link = createLink(item, 'sub-link');
        linksContainer.appendChild(link);
    });
});

fetchData(`${langLoc}${lang}/links.json`)
.then(data => {
    const linksContainer = document.getElementById('links');

    data.forEach(item => {
    const link = createLink(item, 'link');
    const text = createTextElement(`&ensp;${item.text}`);
        link.appendChild(text);
        linksContainer.appendChild(link);
    });
});
